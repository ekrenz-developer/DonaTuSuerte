import { Types } from 'mongoose';

import Service from './Service';
import Draw from '../models/Draw';
import User from '../models/User';
import Raffle from '../models/Raffle';
import Store from '../models/Store';
import Status from '../models/Status';
import error from '../helpers/error'
import uploadClodinary from '../utils/uploadCloudinary';
import config from '../config/index';

const populate = {
  path: 'status store raffles winner',
  populate: {
    path: 'draws'
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

class DrawService extends Service {
  constructor() {
    super(Draw, populate);
    this.User = User;
    this.Raffle = Raffle;
    this.Store = Store;
    this.Status = Status;
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.enter = this.enter.bind(this);
  }

  async insert(idStore, data, idUser, file) {
    try {
      if (!Types.ObjectId.isValid(idStore)) {
        throw new error.ErrorHandler('Invalid id', 400);
      }
      
      //  Si la sucursal no pertenece a una organizacion del usuario, no esta autorizado
      await belongsUser(idStore, this.User, idUser);

      //  Aca iría la lógica para calcular los puntos del sorteo, la cantidad de rifas y el valor de c/u
      let score = 50000,
          scoreRaffle = 250,
          reqRaffles = 200

      //  Segun la logica implementada para el sorteo, se busca el status adecuado.
      //  Por ahora se lo pone a todos como sorteos vigentes
      let status = await this.Status.findOne({ status: 1 });
      if (!status) {
        throw new error.ErrorHandler('Status required not defined', 500);
      }

      let photo = '';
      if (file) {
        const options = {
          folder: config.CLOUDINARY_FOLDER,
          unique_filename: true,
          resource_type: 'image'
        };

        const result = await uploadClodinary(file, options);
        photo = result.secure_url;
      }

      let createDraw = {
        ...data,
        status: status._id,
        score: score,
        scoreRaffle: scoreRaffle,
        reqRaffles: reqRaffles,
        raffles: [],
        store: idStore,
        photo: photo
      }

      let draw = await this.model.create(createDraw);

      const newDraw = { $push: { 'draws': draw._id } }
      await this.Store.findByIdAndUpdate(idStore, newDraw, { new: true, upsert: true });      

      let createdDraw = await this.model
        .findById(draw.id)
        .populate(populate)

      return {
        error: false,
        statusCode: 201,
        data: createdDraw
      };
    } catch (err) {
      throw err
    }
  }

  async update(id, data, idUser) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new error.ErrorHandler('Invalid id', 400);
      }

      let draw = await this.model.findById(id);
      if (draw.status === 3) {
        throw new error.ErrorHandler('Draw is valid', 403);
      }

      //  Si la sucursal no pertenece a una organizacion del usuario, no esta autorizado
      await belongsUser(draw.store, this.User, idUser);

      draw = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        data: draw
      };
    } catch (err) {
      throw err
    }
  }

  async delete(id, idStore, idUser) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new error.ErrorHandler('Invalid id', 400);
      }

      let draw = await this.model.findById(id);
      if (!draw) {
        throw new error.ErrorHandler('Draw not found', 404);
      }

      if (draw.status === 3) {
        throw new error.ErrorHandler('Draw is valid', 403);
      }
      
      //  Si la sucursal no pertenece a una organizacion del usuario, no esta autorizado
      await belongsUser(idStore, this.User, idUser);

      draw = await this.model.findByIdAndDelete(id);

      const deleteDrawId = { $pull: { draws: id } };
      await this.Store.findByIdAndUpdate(idStore, deleteDrawId, { new: true });

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        data: draw
      };
    } catch (err) {
      throw err
    }
  }

  async enter(idUser, idDraw, countRaffles) {
    try {
      if (!countRaffles) {
        throw new error.ErrorHandler('Count of raffles not defined', 400);
      }
      //asigno al usuario la cantidad de rifas correspondientes
      let index = 0;
      while (index < countRaffles) {
        let raffle = await this.Raffle.create({ user: idUser });

        const newRaffle = { $push: { 'raffles': raffle._id } };
        let createdRaffle = await this.model.findByIdAndUpdate(idDraw, newRaffle, { new: true, upsert: true });
      
        index ++;
      }
      
      //agrego el sorteo a la lista de sorteos del usuario
      let draw = await this.User.findOne({ _id: idUser, draws: Types.ObjectId(idDraw) });

      if (!draw || draw === null) {
        const newDraw = { $push: { 'draws': idDraw } }
        await this.User.findByIdAndUpdate(idUser, newDraw, { new: true, upsert: true });
      }

      let user = await this.User
        .findById(idUser)
        .populate({
          path: 'draws',
          populate: {
            path: 'status store raffles winner',
          }
        })
        .populate('role');

      return {
        error: false,
        statusCode: 200,
        data: user
      };
    } catch (err) {
      throw err
    }
  }

  async run(idDraw) {
    try {
      //  Esta logica es provisoria para la demo, la idea es correr un batch que ejecute los sorteos todos los dias a cierta hora

      if (!Types.ObjectId.isValid(idDraw)) {
        throw new error.ErrorHandler('Invalid id', 400);
      }

      let statusFinal = await this.Status.findOne({ status: 5 });
      if (!statusFinal) {
        throw new error.ErrorHandler('Status collection not defined')
      }

      let draw = await this.model
        .findById(idDraw)
        .populate(populate)

      if (!draw) {
        throw new error.ErrorHandler('Draw not found', 400);
      }

      let min = 0,
          max = draw.raffles.length;

      let index = min + Math.floor((max - min) * Math.random());

      let winner = draw.raffles[index].user;
      
      const newDraw = {
        winner: Types.ObjectId(winner),
        status: statusFinal._id
      };
      
      let updatedDraw = await this.model
        .findByIdAndUpdate(idDraw, newDraw, { new: true, upsert: true })
        .populate(populate);

      return {
        error: false,
        statusCode: 202,
        data: updatedDraw
      };      
    } catch (err) {
      throw err
    }

  }
};

export default DrawService;