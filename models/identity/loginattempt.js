'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LoginAttempt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LoginAttempt.init({
    id: DataTypes.UUID,
    timestamp: DataTypes.DATE,
    ipAddress: DataTypes.STRING,
    userAgent: DataTypes.STRING,
    successful: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'LoginAttempt',
  });
  return LoginAttempt;
};