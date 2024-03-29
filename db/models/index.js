const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Subcategory, SubcategorySchema } = require('./subcategory.model');
const { Client, ClientSchema } = require('./client.model');
const { Order, OrderSchema } = require('./order.model');
const { Role, RoleSchema } = require('./role.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Subcategory.init(SubcategorySchema, Subcategory.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Client.associate(sequelize.models);
  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
  Order.associate(sequelize.models);
  Role.associate(sequelize.models);
}

module.exports = setUpModels;
