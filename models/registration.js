'use strict';
const moment = require('moment')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    static associate(models) {
    }
  };
  Registration.init({
    id: {type: DataTypes.UUID, allowNull: false, primaryKey:true },
    user_id: DataTypes.UUID,
    access_code: DataTypes.STRING,
    email: DataTypes.STRING,
    valid_until : {
      type : DataTypes.DATE,
      get : function() {
          return this.getDataValue('valid_until') != null ? moment(this.getDataValue('valid_until')).format('YYYY-MM-DD HH:mm:ss') : null
      }
    },
    created_at : {
      type : DataTypes.DATE,
      get : function() {
          return this.getDataValue('created_at') != null ? moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss') : null
      }
    },
    updated_at : {
      type : DataTypes.DATE,
      get : function() {
          return this.getDataValue('updated_at') != null ? moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss') : null
      }
    }
  }, {
    sequelize,
    modelName: 'Registration',
    tableName:  'Registrations',
    timestamps: false,
  });
  return Registration;
};