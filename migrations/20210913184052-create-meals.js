'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entree_1: {
        type: Sequelize.STRING
      },
      entree_2: {
        type: Sequelize.STRING
      },
      entree_3: {
        type: Sequelize.STRING
      },
      entree_4: {
        type: Sequelize.STRING
      },
      desert_1: {
        type: Sequelize.STRING
      },
      desert_2: {
        type: Sequelize.STRING
      },
      desert_3: {
        type: Sequelize.STRING
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admins',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'set null'
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('meals');
  }
};