import { Types } from "mongoose";

import error from '../helpers/error'

class Service {
  constructor(model, populate = '') {
    this.model = model;
    this.populate = populate;
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get(param) {
    try {
      let item = await this.model
        .findOne(param)
        .populate(this.populate)

      return {
        error: false,
        statusCode: 200,
        data: item
      }
    } catch (err) {
      throw err;
    }
  }

  async getAll(query) {
    let { skip, limit } = query;
    
    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;
    
    delete query.skip;
    delete query.limit;
    
    try {
      let items = await this.model
        .find(query)
        .skip(skip)
        .limit(limit)
        .populate(this.populate)

      let total = await this.model.countDocuments();
      
      return {
        error: false,
        statusCode: 200,
        total,
        data: items
      }
    } catch (err) {
      throw err;
    }
  }

  async insert(data) {
    try {
      let item = await this.model.create(data);
      if (item) {
        return {
          error: false,
          statusCode: 201,
          data: item
        };
      }
    } catch (err) {
      throw err
    }
  }

  async update(id, data) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new error.ErrorHandler('Invalid id', 400);
      }

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

  async delete(id) {
    try {
      let item = await this.model.findByIdAndDelete(id);
      if (!item) {
        throw new error.ErrorHandler('item not found', 404);
      }

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        data: item
      };
    } catch (err) {
      throw err
    }
  }
}

export default Service;