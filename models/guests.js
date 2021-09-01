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
      models.guests.belongsTo(models.relationship_type);
      models.guests.hasOne(models.exports, {
        foreignKey: {
          name: 'guest_id',
          allowNull: false
        }
      })
    }
  };
  guests.init({
    guest_name: DataTypes.STRING,
    guest_email: DataTypes.STRING,
    relationship_type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'guests',
  });
  return guests;
};