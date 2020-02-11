const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
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