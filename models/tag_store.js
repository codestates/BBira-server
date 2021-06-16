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
        models.tag_store.belongsTo(models.store, { foreignKey: "storeId", onDelete: 'CASCADE' })
        models.tag_store.belongsTo(models.tag, { foreignKey: "tagId", onDelete: 'CASCADE' })
    }
  };
  tag_store.init({
    tagId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tag_store',
  });
  return tag_store;
};