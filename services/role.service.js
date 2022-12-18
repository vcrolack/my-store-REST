const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class RoleService {
  constructor() {}

  async create (data) {}

  async find() {
    const response = await models.Role.findAll();
    return response;
  }

  async findOne(id) {}

  async update(id, changes) {}

  async delete(id) {}
}

module.exports = RoleService;
