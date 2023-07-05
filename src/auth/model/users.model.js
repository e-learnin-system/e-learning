'use strict'
//importing
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'hamza'
// calling the database
const { db } = require('../../models/index')
console.log(db)
//import the datatypes from sequelize
const { DataTypes } = require('sequelize')

// create the shcema table
const users = db.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        uniqe: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(password) {
            const hashPass = bcrypt.hashSync(password, 5);
            this.setDataValue('password', hashPass)
        }
    },
    token: {
        type: DataTypes.VIRTUAL,
        get() {
            return jwt.sign({ username: this.username, role: this.role }, SECRET)
        }
    },
    role: {
        type: DataTypes.ENUM('student', 'teacher', 'manager'),
        defaultValue: 'student'
    },
    Capabilities: {
        type: DataTypes.VIRTUAL,
        get() {
            const acl = {
                student: ['read'],
                teacher: ['read', 'post','update'],
                manager: ['read', 'post', 'update','delete']
            }
            return acl[this.role]
        }
    }
})

// function to find the username then compare the password if it is valid then return the user to the middleware if true
users.signinMiddleware = async function (username, password) {
    try {
        const user = await users.findOne({ where: { username } })
        const isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            console.log(user);
            return {
                username:user.username,
                toke:user.token,
                Capabilities:user.Capabilities,
                role:user.role
            }
        } else next('not authorized')

    } catch (e) {
        console.log(e)
    }

}
users.bearerToken = async function (token) {
    const parseToken = jwt.verify(token, SECRET)
    const findUser = await users.findOne({ where: { username: parseToken.username } })
    if (findUser) {
        return findUser;
    } else {
        throw new Error('invalid token')
    }

}

module.exports = users