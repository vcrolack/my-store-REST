'use strict';

const {DataTypes} = require('sequelize');

const {USER_TABLE} = require('../models/user.model');
const {ROLE_TABLE} = require('../models/role.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(USER_TABLE, 'role', {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: ROLE_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
