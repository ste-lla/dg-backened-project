
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
      //models.gift_registry.belongsTo(models.guest_id);
      //models.gift_registry.belongsTo(models.admin_id);
    }
  };
  gift_registry.init({
    gift1: DataTypes.STRING,
    gift2: DataTypes.STRING,
    gift3: DataTypes.STRING,
    gift4: DataTypes.STRING,
    gift5: DataTypes.STRING,
    gift6: DataTypes.STRING,
    admin_id: DataTypes.INTEGER,
    selected_by_guest: DataTypes.BOOLEAN,
    guest_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gift_registry',
  });
  return gift_registry;
};