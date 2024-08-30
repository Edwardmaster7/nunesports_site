const AppError = require("../utils/AppError")

async function ensureAdmin(req, res, next) {
    console.log(req.user) 

    if (req.user.role !== 'admin') {
        return next(new AppError('Insuficient privileges to perform this action', 403))
    }
    next()
}

module.exports = ensureAdmin