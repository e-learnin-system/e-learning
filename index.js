'use strict'

require('dotenv').config()

const { db } = require('./src/models/index')

const { start } = require('./src/server')

const PORT = process.env.PORT || 3002

db.sync().then(() => {
    start(PORT)
}).catch(error => console.log(error))
