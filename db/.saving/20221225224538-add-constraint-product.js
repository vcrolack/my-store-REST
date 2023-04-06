'use strict';

const { DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');
const { PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'category_id', {
      allowNull: false,
      field: 'category_id',
      type: DataTypes.INTEGER,
      references: {
        model: CATEGORY_TABLE,
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
