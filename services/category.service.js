const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoryService {
  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data);
    if (!newCategory) {
      throw boom.notFound('Category was not created. Check the attributes');
    }
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    if (!categories) {
      throw boom.notFound('Categories not found');
    }
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    changes.updatedAt = new Date();
    const category = await this.findOne(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    const response = await category.update(changes);
    return response;
  }

  async delete(id) {
    const category = await this.findOne(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    category.destroy();
    return {id, message: 'This category was deleted'}
  }
}

module.exports = CategoryService;
