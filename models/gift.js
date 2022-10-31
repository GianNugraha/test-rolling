'use strict';
const {
  Model
} = require('sequelize');
// const base_url = 'http://localhost:3000/';

module.exports = (sequelize, DataTypes) => {
  class Gift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Land.hasMany(models.LandDocHistory);
      Gift.hasMany(models.GiftRated);
      Gift.hasMany(models.GiftRedeem);


    }
  }
  Gift.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey:true },
    typeName: { type: DataTypes.STRING, allowNull: false },
    seriesName: { type: DataTypes.STRING, allowNull: false },
    resolution: { type: DataTypes.STRING, allowNull: false },
    memory: { type: DataTypes.STRING, allowNull: false },
    operationSystem: { type: DataTypes.STRING, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    poins: { type: DataTypes.FLOAT, allowNull: false },
    fileUrl : { type: DataTypes.STRING, allowNull: false },
    fileId : { type: DataTypes.STRING, allowNull: false },
    fileType : { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'Gift',
  });
  return Gift;
};