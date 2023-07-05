'use strict'

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./collection')
const student = require('./student.model')
const teacher = require('./teacher.model')
const manager = require('./manager.model')


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
const studentModel= student(sequelize, DataTypes)
const teacherModel =teacher(sequelize, DataTypes)
const managerModel= manager(sequelize, DataTypes)

teacherModel.hasMany(studentModel,{foreignKey: 'teacherId', sourceKey: 'id'})
studentModel.belongsTo(teacherModel,{foreignKey:"teacherId",sourceKey:"id"})

module.exports = { 
    db: sequelize,
    student: new Collection (studentModel),
    teacher:new Collection(teacherModel),
    manager: new Collection (managerModel)
}