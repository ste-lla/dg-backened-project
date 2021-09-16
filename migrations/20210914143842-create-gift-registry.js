'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gift_registries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gift1: {
        type: Sequelize.STRING
      },
      gift2: {
        type: Sequelize.STRING
      },
      gift3: {
        type: Sequelize.STRING
      },
      gift4: {
        type: Sequelize.STRING
      },
      gift5: {
        type: Sequelize.STRING
      },
      gift6: {
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
      selected_by_guest: {
        type: Sequelize.BOOLEAN
      },
      guest_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'guests',
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
    await queryInterface.dropTable('gift_registries');
  }
};