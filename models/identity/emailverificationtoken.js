'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailVerificationToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmailVerificationToken.init({
    id: DataTypes.UUID,
    token: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'EmailVerificationToken',
  });
  return EmailVerificationToken;
};