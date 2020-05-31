import Controller from './Controller';
import StoreService from '../services/StoreService';

const storeService = new StoreService();

class StoreController extends Controller {
  constructor(service) {
    super(service);
    this.insert = this.insert.bind(this);
  }

  async insert(req, res, next) {
    try {
      let idOrg = req.params._id;
      let response = await this.service.insert(req.body, idOrg, req.user._id);
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
      let response = await this.service.delete(_id, req.user._id);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new StoreController(storeService);