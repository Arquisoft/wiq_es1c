const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const database = require('../database');
const { v4: uuidv4 } = require('uuid');

const User = database.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Autogenerated UUID
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
});

const hashPassword = async (user) => {
    user.password = await bcrypt.hash(user.password, 15);
}

User.beforeCreate(hashPassword)

module.exports = User;