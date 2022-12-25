const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ClientService {
  constructor() {}

  async create(data) {
    const newClient = await models.Client.create(data, {
      include: ['user'],
    });
    return newClient;
  }

  async find() {
    const response = await models.Client.findAll({
      include: ['user'],
    });
    return response;
  }

  async findOne(id) {}

  async update(id, changes) {}

  async delete(id) {}
}

module.exports = ClientService;
