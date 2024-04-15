'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      fake: {
        type: Sequelize.JSON
      },
      user_answer: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      onTime: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      gameId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Games', // Name of the Game model
          key: 'id' // Primary key in the Game model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};