const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class ClientService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newClient = await models.Client.create(newData, {
      include: ['user'],
    });
    delete newClient.dataValues.user.dataValues.password;
    return newClient;
  }

  async find() {
    const response = await models.Client.findAll({
      include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const client = await models.Client.findByPk(id);
    if (!client) {
      throw boom.notFound('Client not found');
    }
    return client;
  }

  async update(id, changes) {
    changes.updatedAt = new Date();
    const client = await this.findOne(id);
    const response = await client.update(changes);
    return response;
  }

  async delete(id) {
    const client = await this.findOne(id);
    client.destroy();
    return { id, message: 'This client was deleted' };
  }
}

module.exports = ClientService;
