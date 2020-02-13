const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
    user:{
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('lessons', LessonSchema)