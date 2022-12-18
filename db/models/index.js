const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Subcategory, SubcategorySchema } = require('./subcategory.model');
const { Client, ClientSchema } = require('./client.model');
const { Order, OrderSchema } = require('./order.model');
const { Role, RoleSchema } = require('./role.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Subcategory.init(SubcategorySchema, Subcategory.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
}

module.exports = setUpModels;
