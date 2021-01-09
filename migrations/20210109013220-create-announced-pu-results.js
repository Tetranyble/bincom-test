'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('announced_pu_results', {
      result_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      polling_unit_uniqueid: {
        type: Sequelize.INTEGER
      },
      party_abbreviation: {
        type: Sequelize.STRING
      },
      party_score: {
        type: Sequelize.INTEGER
      },
      entered_by_user: {
        type: Sequelize.STRING
      },
      date_entered: {
        type: Sequelize.DATE
      },
      user_ip_address: {
        type: Sequelize.STRING
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('announced_pu_results');
  }
};