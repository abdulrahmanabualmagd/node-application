'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthenticationProvider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuthenticationProvider.init({
    id: DataTypes.UUID,
    providerName: DataTypes.STRING,
    providerUserID: DataTypes.STRING,
    accessToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AuthenticationProvider',
  });
  return AuthenticationProvider;
};