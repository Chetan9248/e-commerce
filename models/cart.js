'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
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
  cart.init({
    //product_id: DataTypes.STRING,
    product_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantntity: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'carts',
    modelName: 'cart',
  });
  return cart;
};