'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Questions', 'lang', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "es"
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('Questions', 'lang')]);
  }
};
