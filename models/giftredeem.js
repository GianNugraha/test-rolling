'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiftRedeem extends Model {
    static associate(models) {
      // define association here
      GiftRedeem.belongsTo(models.User, { foreignKey: "userId" });
      GiftRedeem.belongsTo(models.Gift, { foreignKey: "GiftId" });
      GiftRedeem.hasMany(models.GiftRated);
    }
  }
  GiftRedeem.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey:true },
    userId: { type: DataTypes.UUID, allowNull: false},
    GiftId: { type: DataTypes.UUID, allowNull: false}
  }, {
    sequelize,
    modelName: 'GiftRedeem',
  });
  return GiftRedeem;
};