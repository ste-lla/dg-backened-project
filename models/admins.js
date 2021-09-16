'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.admins.hasOne(models.meals, {
        foreignKey: {
          name: 'admin_id',
          allowNull: false
        }
      });
      models.admins.hasMany(models.gift_registry, {
        foreignKey: {
          name: 'admin_id',
          allowNull: false
        }
      });
      models.admins.hasMany(models.guests, {
        foreignKey: {
          name: 'admin_id',
          allowNull: true
        }
      });
    }
  };
  admins.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admins',
  });
  return admins;
};