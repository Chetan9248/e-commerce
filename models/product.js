'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({category, cart}) {
      // define association here
      this.belongsTo(category,{foreignKey:"category_id"});
      this.hasOne(cart,{foreignKey:"product_id"});
    }
  }
  product.init({
    name: {
      type:DataTypes.STRING,
      allowNull : false,
    },
     /*category_id: {
       type:DataTypes.INTEGER,
       allowNull : false,
     },*/
    description: {
      type:DataTypes.STRING,
      allowNull : false,
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull : false,
    },
  }, 
  {
    sequelize,
    tableName: 'products',
    modelName: 'product',
  });
  return product;
};