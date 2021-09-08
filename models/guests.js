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
      //models.guest.belongsTo(models.relation_to_bg);

      models.guests.hasOne(models.meals, {
        foreignKey: {
          name: 'guest_id',
          allowNull: false
        }
      });
      
      models.guests.hasOne(models.gifts, {
        foreignKey: {
          name: 'guest_id',
          allowNull: false
        }
      });
    }
  };
  guests.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    relation_to_bg: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'guests',
  });
  return guests;
};