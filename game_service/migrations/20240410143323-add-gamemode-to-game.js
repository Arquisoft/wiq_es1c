'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Games', 'gameMode', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "classic"
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('Games', 'gameMode')]);
  }
};
