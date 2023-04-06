'use strict';

const { USER_TABLE } = require('../models/user.model');
const { ROLE_TABLE } = require('../models/role.model');

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(USER_TABLE, 'role_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      newName: 'role_id',
      references: {
        model: ROLE_TABLE,
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
