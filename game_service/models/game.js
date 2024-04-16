'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.hasMany(models.Question, {
        foreignKey: 'gameId', 
        as: 'Questions' 
      });
    }
  }
  Game.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },
    user_id: DataTypes.UUID,
    tags: DataTypes.STRING,
    numberOfQuestions: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    gameMode: {
      type: DataTypes.STRING,
      defaultValue: "classic"
    }
  }, {
    timestamps: true,
    defaultScope: {
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order
    },
    sequelize,
    modelName: 'Game',
  });
  return Game;
};