const jwt = require('jsonwebtoken');
const User = require('../models/User')

module.exports = async function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Access denied')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        const findUser = await User.findOne({_id: verified._id})
        req.user = findUser;
        next();
    }
    catch (err) {
        next(err);
    }
}