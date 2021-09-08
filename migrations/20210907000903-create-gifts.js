'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gift_choice: {
        type: Sequelize.STRING
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
      selected: {
        type: Sequelize.BOOLEAN
      },
      gift_id: {
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('gifts');
  }
};