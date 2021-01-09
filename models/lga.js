'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  lga.init({
    uniqueid: DataTypes.INTEGER,
    lga_id: DataTypes.INTEGER,
    lga_name: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    lga_description: DataTypes.STRING,
    entered_by_user: DataTypes.STRING,
    date_entered: DataTypes.DATE,
    user_ip_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lga',
  });
  return lga;
};