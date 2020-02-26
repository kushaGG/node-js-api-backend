const jwt = require('jsonwebtoken');
const User = require('../models/User')

module.exports = async function(req, res, next) {
    console.log(JSON.stringify(req.headers))
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Access denied')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)

        const foundUser = await User.findOne({_id: verified._id})
        if (!foundUser) return res.status(404).json('User not found');

        req.user = foundUser;
        next();
    }
    catch (err) {
        next(err);
    }
}