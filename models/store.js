'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.store.hasOne(models.user, { foreignKey: "storeId" })
      models.store.hasMany(models.item, { foreignKey: "storeId" })
      models.store.hasMany(models.tag_store, { foreignKey: "storeId" })
    }
  };
  store.init({
    phone: DataTypes.STRING,
    storename: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'store',
  });
  return store;
};