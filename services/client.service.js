const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

class ClientService {
  constructor() {}

  async create(data) {}

  async find() {
    const response = await models.Client.findAll();
    return response;
  }

  async findOne(id) {}

  async update(id, changes) {}

  async delete(id) {}

}

module.exports = ClientService;
