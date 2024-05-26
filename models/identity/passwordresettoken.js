'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordResetToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PasswordResetToken.init({
    id: DataTypes.UUID,
    token: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    expiresAt: DataTypes.DATE,
    ipAddress: DataTypes.STRING,
    userAgent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PasswordResetToken',
  });
  return PasswordResetToken;
};