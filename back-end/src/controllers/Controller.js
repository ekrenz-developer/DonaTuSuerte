class Controller {
  constructor(service) {
    this.service = service;
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get(req, res, next) {
    try {
      let response = await this.service.get(req.params);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      let response = await this.service.getAll(req.query);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }

  async insert(req, res, next) {
    try {
      let response = await this.service.insert(req.body);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { _id } = req.params;
      let response = await this.service.update(_id, req.body);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { _id } = req.params;
      let response = await this.service.delete(_id);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      next(err);
    }
  }
}

export default Controller;