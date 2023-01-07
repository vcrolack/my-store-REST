const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    if (!newOrder) {
      throw boom.badData('Order was not created. Check the attributes');
    }
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    if (!newItem) {
      throw boom.badData('Item was not created. Check the attributes');
    }
    return newItem;
  }

  async find() {
    const response = await models.Order.findAll();
    return response;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'client',
          include: ['user']
        },
        'items'
      ],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    changes.updatedAt = new Date();
    const order = await this.findOne(id);
    const response = await order.update(changes);
    return response;
  }

  async delete(id) {
    const order = await this.findOne(id);
    order.destroy();
    return { id, message: 'This order was deleted' };
  }
}

module.exports = OrderService;
