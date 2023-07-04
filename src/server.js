'use strict'

const express = require('express')
const app = express();
const cors = require('cors')
const router = require('./auth/route')
const Error404 = require('../src/errorHandlers/404')
const Error500 = require('../src/errorHandlers/500')

app.use(cors())
app.use(express.json());
app.use(router)
app.use(Error404)
app.use(Error500)


function start(PORT){
    app.listen(PORT,()=>console.log('running on port',PORT))
}

module.exports = {
    start,
    app
}