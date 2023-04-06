'use strict';

const {CLIENT_TABLE, ClientSchema} = require('../models/client.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(CLIENT_TABLE, 'user_id', ClientSchema.userId);
    await queryInterface.removeColumn(CLIENT_TABLE, 'password', ClientSchema.password);
    await queryInterface.removeColumn(CLIENT_TABLE, 'email', ClientSchema.email);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CLIENT_TABLE, 'user_id', ClientSchema.userId);
    await queryInterface.addColumn(CLIENT_TABLE, 'password', ClientSchema.password);
    await queryInterface.addColumn(CLIENT_TABLE, 'email', ClientSchema.email);
  }
};
