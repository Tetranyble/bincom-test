'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class polling_unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.polling_unit.hasMany(models.announced_pu_results,{
        sourceKey: 'uniqueid',
        foreignKey: 'polling_unit_uniqueid', 
        constraints: false})
    }
  };
  polling_unit.init({
    uniqueid: DataTypes.INTEGER,
    polling_unit_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    lga_id: DataTypes.INTEGER,
    uniquewardid: DataTypes.INTEGER,
    polling_unit_number: DataTypes.STRING,
    polling_unit_name: DataTypes.STRING,
    polling_unit_description: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    long: DataTypes.INTEGER,
    entered_by_user: DataTypes.STRING,
    date_enetered: DataTypes.DATE,
    user_ip_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'polling_unit',
    freezeTableName: true,
    timestamps: false,
  });
  return polling_unit;
};