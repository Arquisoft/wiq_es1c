const { DataTypes } = require('sequelize');
const database = require('../database');
const { v4: uuidv4 } = require('uuid');

const Question = database.define('Question', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Autogenerated UUID
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fake: {
        type: DataTypes.JSON, 
        allowNull: false,
    },
    user_answer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    duration: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        allowNull: false
    },
    onTime : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
},{
    timestamps: true,
    defaultScope: {
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order
    },
});



module.exports = Question;