const { Sequelize } = require('sequelize');

let sequelize

if (process.env.DB_URL) {
    sequelize = new Sequelize('db', 'root', '', {
        host: 'mariadb',
        port: 3306,
        dialect: 'mariadb'
    })
}else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false, 
    });
}

sequelize.authenticate(); //Make sure the connection is good.

module.exports = sequelize;