const { Model, DataTypes, Sequelize } = require('sequelize');
const { CLIENT_TABLE } = require('./client.model');

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
    //type: DataTypes.JSON,
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
    references: {
      model: CLIENT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      return 0;
    },
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
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
  static associate(models) {
    this.belongsTo(models.Client, {
      as: 'client',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'product_id',
    });
  }
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
