const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db', 'root', '', {
    host: 'mariadb',
    port: 3306,
    dialect: 'mariadb'
})

sequelize.authenticate(); //Make sure the connection is good.

module.exports = sequelize;