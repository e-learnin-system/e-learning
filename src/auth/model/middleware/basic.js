'use strict'

//importing
const base64 = require('base-64')
const user = require('../users.model')

//middleware to handle the user name and password that came from the header
module.exports = async function signinMiddleware(req, res, next) {
    const auth = req.headers.authorization.split(" ").pop();
    console.log(auth);
    if (auth) {
        const decoded = base64.decode(auth)
        // hamza:123
        const [username, password] = decoded.split(":")
        user.signinMiddleware(username, password).then(data => {
            req.users = data
            next();
        })
    } else {
        next('error')
    }
}