const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  products: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  document: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  clientId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'client_id',
  },
  total: {
    allowNull: false,
    type: DataTypes.INTEGER,
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

class Order extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_TABLE,
  OrderSchema,
  Order,
};
