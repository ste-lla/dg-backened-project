'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //models.meals.belongsTo(models.guest_id);
    }
  };
  meals.init({
    meal_choice: DataTypes.STRING,
    desert_choice: DataTypes.STRING,
    guest_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meals',
  });
  return meals;
};