const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    if (!newProduct) {
      throw boom.badRequest("Product wasn't created, check the attributes");
    }
    return newProduct;
  }

  async find() {
    const response = await models.Product.findAll({
      include: ['category']
    });
    if (!response) {
      throw boom.notFound('Products not found')
    }
    return response;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    })
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    changes.updatedAt = new Date();
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);
    product.destroy();
    return {id, message: 'This product was deleted'}
  }
}

module.exports = ProductService;
