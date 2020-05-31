import Controller from './Controller';
import OrganizationService from '../services/OrganizationService';

const organizationService = new OrganizationService();

class OrganizationController extends Controller {
  constructor(service) {
    super(service);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async insert(req, res, next) {
    try {
      let response = await this.service.insert(req.body, req.user._id);
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

export default new OrganizationController(organizationService);