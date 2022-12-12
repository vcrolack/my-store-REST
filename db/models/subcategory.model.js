const { Model, DataTypes, Sequelize } = require('sequelize');

const SUBCATEGORY_TABLE = 'subcategories';

const SubcategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  category_id: {
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

class Subcategory extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBCATEGORY_TABLE,
      modelName: 'Subcategory',
      timestamps: false,
    };
  }
}

module.exports = {
  SUBCATEGORY_TABLE,
  SubcategorySchema,
  Subcategory,
};
