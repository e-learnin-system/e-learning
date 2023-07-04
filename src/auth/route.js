'use strict'
// importing 
const express = require('express');
const router = express.Router();
const user = require('../auth/model/users.model')
const signinMiddleware = require('../auth/model/middleware/basic')
const isAuth = require('../auth/model/middleware/bearer')
const acl = require('../auth/model/middleware/acl')
// controller
router.get('/', homePage)
router.post('/signup', signupHandler)
//middleware to check authorization
router.post('/signin', signinMiddleware, signinHandler)
router.get('/secretstuff', isAuth, acl('delete'), secretHandler)
// router.post('/secretstuff', isAuth, acl('post'), secretHandler)
// router.put('/secretstuff', isAuth, acl('update'), secretHandler)
// router.delete('/secretstuff', isAuth, acl('delete'), secretHandler)
router.get('/users', isAuth, usersHnadler)
// Home function
function homePage(req, res) {
    try {
        res.status(200).json('welcome to home page')
    } catch (e) {
        throw new Error(e)
    }
}

// signup function
async function signupHandler(req, res, next) {
    try {
        const { username, password, role } = req.body
        const obj = {
            username,
            password,
            role
        }
       
        const record = await user.create(obj)
        console.log('tesssssssssssssssssssst', record);
        res.status(201).json(record)
    } catch (e) {
        next(e)
    }

}
//signin function
async function signinHandler(req, res) {
    res.status(200).json(req.users)
    console.log('hsdvfcjoewlfcd;olv',req.users);
}
//secret function 
async function secretHandler(req, res) {
    res.status(200).json('welcome to secret page')
}

async function usersHnadler(req, res) {
    res.status(200).json('works')
}


module.exports = router