'use strict'

const user = require('../users.model')

module.exports = async function isAuth(req,res,next){
    const token = req.headers.authorization.split(" ").pop();
    user.bearerToken(token).then(data =>{
        req.users = data;
        next();
    })
}