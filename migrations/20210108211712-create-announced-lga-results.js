'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('announced_lga_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      result_id: {
        type: Sequelize.INTEGER
      },
      lga_name: {
        type: Sequelize.INTEGER
      },
      party_abbreviation: {
        type: Sequelize.STRING
      },
      party_score: {
        type: Sequelize.INTEGER
      },
      entered_by_user: {
        type: Sequelize.INTEGER
      },
      date_entered: {
        type: Sequelize.DATE
      },
      user_ip_address: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('announced_lga_results');
  }
};