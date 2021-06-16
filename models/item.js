'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.item.belongsTo(models.store, { foreignKey: "storeId" })
    }
  };
  item.init({
    itemname: DataTypes.STRING,
    itemphoto: DataTypes.STRING,
    itemdesc: DataTypes.STRING,
    itemprice: DataTypes.STRING,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};