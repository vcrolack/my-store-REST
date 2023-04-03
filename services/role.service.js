const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class RoleService {
  constructor() {}

  async create (data) {
    const newRole = await models.Role.create(data);
    return newRole;
  }

  async find() {
    const response = await models.Role.findAll();
    return response;
  }

  async findOne(id) {
    const role = await models.Role.findByPk(id);
    if (!role) {
      throw boom.notFound('Role not found');
    }
    return role;
  }

  async update(id, changes) {
    changes.updatedAt = new Date();
    const role = await this.findOne(id);
    const response = await role.update(changes);
    return response;
  }

  async delete(id) {
    const role = await this.findOne(id);
    role.destroy();
    return { id, message: 'This role was deleted' };
  }
}

module.exports = RoleService;
