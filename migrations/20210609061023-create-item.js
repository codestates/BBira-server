'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      itemphoto: {
        type: Sequelize.STRING(4000),
        allowNull: false,
        defaultValue: ''
      },
      itemdesc: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      itemprice: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      storeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.addConstraint("items", {
      fields: ["storeId"],
      type: "foreign key",
      name: "fk_items_stores",
      references: {
        table: "stores",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};