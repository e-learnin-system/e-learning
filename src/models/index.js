'use strict'

const { Sequelize, DataTypes } = require('sequelize');

const DATABASE = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
} : {}


const sequelize = new Sequelize(DATABASE, sequelizeOptions)

module.exports = { 
    db: sequelize
}