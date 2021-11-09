const Sequelize = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: str => console.log(str),
    define: {
        timestamps: true,
        freezeTableName: true,
        paranoid: true
    },
    //operatorsAliases: false,
    dialectOptions: {
        prependSearchPath: true
    }
})

module.exports = sequelize