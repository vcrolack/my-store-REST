const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

class OrderService {
  constructor(){}

  async create (data) {}

  async find() {
    const response = await models.Order.findAll();
    return response;
  }

  async findOne(id) {}

  async update(id, changes) {}

  async delete(id) {}
}

module.exports = OrderService;
