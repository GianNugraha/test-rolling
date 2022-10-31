"use strict";
const { Model } = require("sequelize");
const hashPassword = require("../helpers/hashPassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {type: DataTypes.UUID, allowNull: false, primaryKey:true },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: { len: [8, 132], notEmpty: true },
      },
      isActive: { type: DataTypes.BOOLEAN},
      isVerifiedEmail: { type: DataTypes.BOOLEAN},
      role: { type: DataTypes.STRING, defaultValue: "user" },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (instance) => {
          instance.password = hashPassword(instance.password);
        },
        beforeUpdate: (instance) => {
          instance.password = hashPassword(instance.password);
        },
      },
      modelName: "User",
    }
  );
  return User;
};
