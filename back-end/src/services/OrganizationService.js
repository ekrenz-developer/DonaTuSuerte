import { Types } from 'mongoose';

import Service from './Service';
import Organization from '../models/Organization';
import Status from '../models/Status';
import Store from '../models/Store';
import Draw from '../models/Draw';
import User from '../models/User';
import error from '../helpers/error'

const populate = {
  path: 'status stores',
  populate: {
    path: 'draws'
  }
}
class OrganizationService extends Service {
  constructor() {
    super(Organization, populate);
    this.Status = Status;
    this.Store = Store;
    this.Draw = Draw;
    this.User = User;
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async insert(body, idUser) {
    try {
      //  Aca iría la logica para verificar que es una organizacion valida por el CUIT,
      //  mientas todas las organizaciones van a ser aprobadas
      let status = await this.Status.findOne({ status: 1 });
      if (!status) {
        throw new error.ErrorHandler('Status collection not defined')
      }
      
      let organizationCreated = await this.model.create({
        ...body,
        status: status._id
      });

      const newOrganization = { $push: { 'organizations': organizationCreated._id } }
      await this.User.findByIdAndUpdate(idUser, newOrganization, { new: true, upsert: true });

      let organization = await this.model
        .findById(organizationCreated._id)
        .populate(populate);

      if (organization) {
        return {
          error: false,
          statusCode: 201,
          data: organization
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async update(id, data, idUser) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new error.ErrorHandler('Invalid id', 400);
      }

      //  Si la organizacion no pertenece al usuario, no esta autorizado
      let organizationsUser = await this.User.findById(idUser)
      let found = organizationsUser.organizations.find(organization => organization == id);
      if (!found) {
        throw new error.ErrorHandler('Unauthorized', 403);
      }

      let organization = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        data: organization
      };
    } catch (err) {
      throw err
    }
  }

  async delete(id, idUser) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new error.ErrorHandler('Invalid organization', 400);
      }

      //  Si la organizacion no pertenece al usuario, no esta autorizado
      let organizationsUser = await this.User.findById(idUser)
      let found = organizationsUser.organizations.find(organization => organization == id);
      if (!found) {
        throw new error.ErrorHandler('Unauthorized', 403);
      }

      let organization = await this.model.findById(id);
      if (!organization) {
        return {
          error: true,
          statusCode: 404,
          message: 'Organization not found'
        };
      }

      //  Si la organizacion tiene un sorteo vigente no la puedo eliminar
      if (organization.stores) {
        organization.stores.forEach(store => {
          if (store.draws) {
            store.draws.forEach(draw => {
              if (draw.status === 3) {
                throw new error.ErrorHandler('The organization has a valid drawing', 403);
              } 
            })
          }
        })
      }

      //  Elimino todos los sorteos, sucursales y organizaciones (en ese orden respectivamente)
      if (organization.stores) {
        organization.stores.forEach(async (store) => {
          if (store.draws) {
            store.draws.forEach(async (draw) => {
              deletedDraw = await this.Draw.findByIdAndDelete(draw._id);
            })
          }
          deletedStore = await this.Store.findByIdAndDelete(store._id);
        });
      }

      let deletedOrganization = await this.model.findByIdAndDelete(id);

      const deleteOrgId = { $pull: { organizations: id } }
      await this.User.findByIdAndUpdate(idUser, deleteOrgId, { new: true });

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        data: deletedOrganization
      };
    } catch (err) {
      throw err;
    }
  }
}

export default OrganizationService;