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
      //models.meals.belongsTo(models.admin_id)
    }
  };
  meals.init({
    entree_1: DataTypes.STRING,
    entree_2: DataTypes.STRING,
    entree_3: DataTypes.STRING,
    entree_4: DataTypes.STRING,
    desert_1: DataTypes.STRING,
    desert_2: DataTypes.STRING,
    desert_3: DataTypes.STRING,
    admin_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meals',
  });
  return meals;
};