'use strict';

const {UserSchema, USER_TABLE} = require('../models/user.model')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'level', UserSchema.level);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'level', UserSchema.level);
  }
};
