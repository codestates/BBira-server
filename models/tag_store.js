'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tag_store.init({
    tag_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tag_store',
  });
  return tag_store;
};