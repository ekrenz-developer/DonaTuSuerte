import Controller from './Controller';
import DrawService from '../services/DrawService';

const drawService = new DrawService();

class DrawController extends Controller {
  constructor(service) {
    super(service);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.enter = this.enter.bind(this);
  }

  async insert(req, res, next) {
    try {
      let idStore = req.params.idStore;
      let response = await this.service.insert(idStore, req.body, req.user._id, req.file);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { _id } = req.params;
      let response = await this.service.update(_id, req.body, req.user._id);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { _id } = req.params;
      let idStore = req.params.idStore;

      let response = await this.service.delete(_id, idStore, req.user._id);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }

  async enter(req, res, next) {
    try {
      let idUser = req.user._id;
      let countRaffles = req.body.countRaffles;
      let idDraw = req.param._id;
  
      let response = await this.service.enter(idUser, idDraw, countRaffles);
      
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err)
    }
  }
}

export default new DrawController(drawService);