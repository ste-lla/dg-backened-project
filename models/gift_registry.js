'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gift_registry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  gift_registry.init({
    gift_name: DataTypes.STRING,
    gift_type: DataTypes.STRING,
    gift_id: DataTypes.INTEGER,
    selected: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'gift_registry',
  });
  return gift_registry;
};