'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('polling_units', {
      uniqueid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      polling_unit_id: {
        type: Sequelize.INTEGER
      },
      ward_id: {
        type: Sequelize.INTEGER
      },
      lga_id: {
        type: Sequelize.INTEGER
      },
      uniquewardid: {
        type: Sequelize.INTEGER
      },
      polling_unit_number: {
        type: Sequelize.STRING
      },
      polling_unit_name: {
        type: Sequelize.STRING
      },
      polling_unit_description: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.INTEGER
      },
      long: {
        type: Sequelize.INTEGER
      },
      entered_by_user: {
        type: Sequelize.STRING
      },
      date_enetered: {
        type: Sequelize.DATE
      },
      user_ip_address: {
        type: Sequelize.STRING
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('polling_units');
  }
};