const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('courses', CourseSchema)