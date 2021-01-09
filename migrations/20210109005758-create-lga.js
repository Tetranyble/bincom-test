'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lgas', {
      
      uniqueid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lga_id: {
        type: Sequelize.INTEGER
      },
      lga_name: {
        type: Sequelize.STRING
      },
      state_id: {
        type: Sequelize.INTEGER
      },
      lga_description: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('lgas');
  }
};