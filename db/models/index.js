const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { Subcategory, SubcategorySchema } = require('./subcategory.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Subcategory.init(SubcategorySchema, Subcategory.config(sequelize));
}

module.exports = setUpModels;
