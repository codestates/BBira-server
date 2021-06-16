'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tag_stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagId: {
        type: Sequelize.INTEGER
      },
      storeId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint("tag_stores", {
      fields: ["storeId"],
      type: "foreign key",
      name: "fk_tag_stores_stores",
      references: {
        table: "stores",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("tag_stores", {
      fields: ["tagId"],
      type: "foreign key",
      name: "fk_tag_stores_tags",
      references: {
        table: "tags",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tag_stores');
  }
};