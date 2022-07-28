'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({product}) {
      // define association here
      this.belongsTo(product,{foreignKey:"product_id"});
    }
  }
  history.init({
    product_name: DataTypes.STRING,
    product_id: DataTypes.STRING,
    quantntity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'histories',
    modelName: 'history',
  });
  return history;
};