const { Model, DataTypes, Sequelize } = require('sequelize');
const { ROLE_TABLE } = require('./role.model');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'first_name',
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  roleId: {
    field: 'role_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ROLE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  level: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at',
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Client, { as: 'client', foreignKey: 'userId' });
    this.belongsTo(models.Role, {as: 'role'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
};
