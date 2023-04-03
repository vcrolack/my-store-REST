const {Sequelize} = require('sequelize');
const { configPostgres } = require('../config/config');
const setUpModels = require('../db/models');

const USER = encodeURIComponent(configPostgres.dbUser);
const PASSWORD = encodeURIComponent(configPostgres.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${configPostgres.dbHost}:${configPostgres.dbPort}/${configPostgres.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log
});

setUpModels(sequelize);
//sequelize.sync();

module.exports = sequelize;

