'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.Game, {
        foreignKey: 'gameId',
        as: 'game' // Alias for the association
      });
    }
  }
  Question.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    answer: DataTypes.STRING,
    fake: DataTypes.JSON,
    user_answer: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    onTime: DataTypes.BOOLEAN
  }, {
    timestamps: true,
    defaultScope: {
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order
    },
    sequelize,
    modelName: 'Question',
  });
  return Question;
};