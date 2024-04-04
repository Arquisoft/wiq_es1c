'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SettingsGameModes', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID
      },
      durationQuestion: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SettingsGameModes');
  }
};