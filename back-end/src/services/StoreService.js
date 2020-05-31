import { Types } from "mongoose";

import Service from './Service';
import Store from '../models/Store';
import User from '../models/User';
import Organization from '../models/Organization';
import error from '../helpers/error'

const populate = {
  path: 'draws',
  populate: {
    path: 'status store raffles winner'
  }
}

const belongsUser = async(idStore, Model ,idUser, getOrgId = false) => {
  let organizationsUser = await Model
    .findById(idUser)
    .populate({ path: 'organizations' })
  let organizationLenght = organizationsUser.organizations.length;
  let validation = false;
  let index = 0;
  let idOrg;

  //  Si existe la sucursal en alguna de las organizaciones del usuario, esta autorizado.
  while(!validation && index < organizationLenght) {
    if (organizationsUser.organizations[index].stores) {
      validation = organizationsUser.organizations[index].stores.includes(idStore);
      idOrg = organizationsUser.organizations[index];
    }
    index++;
  }

  if (!validation) {
    throw new error.ErrorHandler('Unauthorized', 403);
  }

  if (getOrgId) {
    return idOrg;
  }
}

class StoreService extends Service {
  constructor() {
    super(Store, populate);
    this.Organization = Organization;
    this.User = User;
    this.insert = this.insert.bind(this);
    
  }

  async insert(data, idOrg, idUser) {
    try {
      if (!Types.ObjectId.isValid(idOrg)) {
        throw new error.ErrorHandler('Invalid organization', 400);
      }

      //  Si la organizacion no pertenece al usuario, no esta autorizado
      let organizationsUser = await this.User.findById(idUser)
      let found = organizationsUser.organizations.find(organization => organization == idOrg);
      if (!found) {
        throw new error.ErrorHandler('Unauthorized', 403);
      }

      let org = await this.Organization.findById(idOrg);
      if (!org) {
        throw new error.ErrorHandler('Invalid organization', 400);
      }

      let store = await this.model.create(data);

      const newStore = { $push: { 'stores': store._id } }
      await this.Organization.findByIdAndUpdate(idOrg, newStore, { new: true, upsert: true });
      
      return {
        error: false,
        statusCode: 201,
        data: store
      };
    } catch (err) {
      throw err;
    }
  }

  async update(id, data, idUser) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new error.ErrorHandler('Invalid id', 400);
      }

      //  Si la sucursal no pertenece a una organizacion del usuario, no esta autorizado
      await belongsUser(id, this.User, idUser);

      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        data: item
      };
    } catch (err) {
      throw err
    }
  }

  async delete(id, idUser) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new error.ErrorHandler('Invalid store', 400);
      }

      //  Si la sucursal tiene un sorteo vigente no se puede eliminar
      let store = this.model.findById(id);
      if (store.draws) {
        store.draws.forEach(draw => {
          if (draw.status === 3) {
            throw new error.ErrorHandler('The store has a valid drawing', 403);
          }
        })
      };

      //  Si la sucursal no pertene a una organizacion del usuario, no esta autorizado
      let idOrg = await belongsUser(id, this.User, idUser, true);
      
      store = await this.model.findByIdAndDelete(id);
      if (!store) {
        throw new error.ErrorHandler('Store not found', 404);
      }

      const deleteStoreId = { $pull: { stores: id } };
      await this.Organization.findByIdAndUpdate(idOrg, deleteStoreId, { new: true });

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        data: store
      };
    } catch (err) {
      throw err
    }
  }
}

export default StoreService;