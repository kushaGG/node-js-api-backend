const mongoose = require('mongoose');

const UserScheme = mongoose.Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: (true, 'email must be exist'),
        unique: (true, 'email must be uniquem, email alredy taked'),
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: (true, 'user name must be exist'),
        unique: (true, 'user name be unique, user name alredy taked'),
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserScheme);