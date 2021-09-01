'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gifts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.gifts.belongsTo(models.guest_id)
    }
  };
  gifts.init({
    gift_name: DataTypes.STRING,
    gift_type: DataTypes.STRING,
    guest_id: DataTypes.INTEGER,
    selected: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'gifts',
  });
  return gifts;
};