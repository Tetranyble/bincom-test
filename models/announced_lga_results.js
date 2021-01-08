'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class announced_lga_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  announced_lga_results.init({
    result_id: DataTypes.INTEGER,
    lga_name: DataTypes.INTEGER,
    party_abbreviation: DataTypes.STRING,
    party_score: DataTypes.INTEGER,
    entered_by_user: DataTypes.INTEGER,
    date_entered: DataTypes.DATE,
    user_ip_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'announced_lga_results',
  });
  return announced_lga_results;
};