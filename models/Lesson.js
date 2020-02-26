const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
    user:{
        type: mongoose.ObjectId,
        ref: 'user',
        required: true
    },
    course: {
        type: mongoose.ObjectId,
        ref: 'course',
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

module.exports = mongoose.model('lesson', LessonSchema)