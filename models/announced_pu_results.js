'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class announced_pu_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.announced_pu_results.belongsTo(models.polling_unit, {
        foreignKey: 'polling_unit_uniqueid',
        targetKey: 'uniqueid', constraints: false
      });
    }
  };
  announced_pu_results.init({
    result_id: DataTypes.INTEGER,
    polling_unit_uniqueid: DataTypes.INTEGER,
    party_abbreviation: DataTypes.STRING,
    party_score: DataTypes.INTEGER,
    entered_by_user: DataTypes.STRING,
    date_entered: DataTypes.DATE,
    user_ip_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'announced_pu_results',
    timestamps: false,
    freezeTableName: true,
  });
  return announced_pu_results;
};