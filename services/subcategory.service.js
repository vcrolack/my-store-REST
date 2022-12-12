const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

class SubcategoryService {
  constructor() {}

  async create(data) {
    const newSubcategory= {};
    return newSubcategory;
  }

  async find() {
    const response = await models.Subcategory.findAll();
    return response;
  }

  async findOne(id) {}

  async update(id, changes) {}

  async delete(id) {}

}

module.exports = SubcategoryService;
