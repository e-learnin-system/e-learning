'use strict'

module.exports = (capiblity) => {
    return (req, res, next) => {
        if (req.users.Capabilities.includes(capiblity)) next();
        else next('u dont have the capiblity')
    }
}

