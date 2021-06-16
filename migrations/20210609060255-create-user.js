'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      password: {
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
    });

    await queryInterface.addConstraint("users", {
      fields: ["storeId"],
      type: "foreign key",
      name: "fk_users_stores",
      references: {
        table: "stores",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};