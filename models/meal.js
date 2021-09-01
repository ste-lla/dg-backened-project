'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.meal.belongsTo(models.guest_id)
    }
  };
  meal.init({
    meal_name: DataTypes.STRING,
    meal_type: DataTypes.STRING,
    guest_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meal',
  });
  return meal;
};