const { Sequelize } = require('sequelize');

let sequelize

if (process.env.DB_URL) {
    console.log("Maria DB Selected")
    sequelize = new Sequelize('db', 'root', '', {
        host: 'mariadb',
        port: 3306,
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