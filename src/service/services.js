/* eslint-disable import/extensions */
import dataBase from '../model/index.js';

class Services {
  constructor(nomeModel) {
    this.model = nomeModel;
  }

  async getAllDate(returned = '') {
    const response = await dataBase[this.model].find({}, returned).exec();
    return response;
  }

  async getOneId(id, returned = '') {
    const response = await dataBase[this.model].findById(id, returned).exec();
    return response;
  }

  async getOne(dtn, returned = '') {
    const response = await dataBase[this.model].findOne(dtn, returned).exec();
    return response;
  }

  async createDate(dtn) {
    const newDtn = await dataBase[this.model].create(dtn);
    return newDtn;
  }

  async updateDate(id, dtn) {
    const opts = { runValidators: true };
    const updatedDate = await dataBase[this.model].findByIdAndUpdate(id, { $set: dtn }, opts);
    return updatedDate;
  }

  async dropDate(id) {
    const deletedDate = await dataBase[this.model].findByIdAndDelete(id);
    return deletedDate;
  }
}

export default Services;
