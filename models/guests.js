'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.guests.hasOne(models.gift_registry, {
        foreignKey: {
          name: 'guest_id',
        }
      });
      //models.guests.belongsTo(models.admin_id)
    }
  };
  guests.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    entree_choice: DataTypes.STRING,
    desert_choice: DataTypes.STRING,
    gift_choice: DataTypes.STRING,
    cancelled_rsvp: DataTypes.BOOLEAN,
    admin_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'guests',
  });
  return guests;
};