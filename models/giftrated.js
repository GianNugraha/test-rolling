'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiftRated extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GiftRated.belongsTo(models.Gift, { foreignKey: "GiftId" });
      GiftRated.belongsTo(models.User, { foreignKey: "userId" });
      GiftRated.belongsTo(models.GiftRedeem, { foreignKey: "GiftRedeemId" });
    }
  }
  GiftRated.init({
    id: { type: DataTypes.UUID, allowNull: false, primaryKey:true },
    GiftId: { type: DataTypes.UUID, allowNull: false},
    GiftRedeemId: { type: DataTypes.UUID, allowNull: false},
    userId: { type: DataTypes.UUID, allowNull: false},
    rate: {type: DataTypes.DECIMAL, allowNull: false}
  }, {
    sequelize,
    modelName: 'GiftRated',
  });
  return GiftRated;
};