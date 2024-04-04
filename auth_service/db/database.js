const { Sequelize } = require('sequelize');

let sequelize

if (process.env.DB_URL) {
    console.log("Maria DB Selected")
    sequelize = new Sequelize('db', 'root', '', {
        host: 'UserDataDB',
        port: 9001,
        dialect: 'mariadb'
    })
}else {
    console.log("SQLITE Selected")
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false, 
    });
}

sequelize.authenticate(); //Make sure the connection is good.

module.exports = sequelize;