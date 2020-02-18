const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { regValidation } = require('../validates');

router.post('/register', async function(req, res, next) {
    const { error } = regValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
    })
    console.log(req.body)
    try {
        const userSaved = await user.save();
        console.log(userSaved);
        res.json({ _id: userSaved._id, email: userSaved.email, username: userSaved.username });
    }
    catch (err) {
        next(err);
    }
});

router.post('/login', async function(req, res, next) {
    try{
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json('Email is not found');
    
        const validPass = await bcrypt.compare( req.body.password, user.password );
        if (!validPass) return res.status(400).json('Passord is wrong');
    
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    
        res.header('auth-token', token).json(token);
    }
    catch (err) {
        next(err);
    }
})


module.exports = router;