const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const verify = require('./verifyToken');

router.get('/course/:courseId/lessons', async (req, res) => {
    try {
        const lessons = await Lesson.find({ course: { $eq: req.params.courseId } });
        res.json(lessons)
    }
    catch (err) {
        res.json({ message: err })
    }   
});

//create lesson
router.post('/course/:courseId/lessons', verify, async (req, res) => {
    const lesson = new Lesson({
        user: req.user._id,
        course: req.params.courseId,
        title: req.body.title,
        description: req.body.description
    })
    console.log(req.body)
    try {
        const savedLesson = await lesson.save();
        res.json(savedLesson);
    } catch (err) {
        res.json({ message: err })
    }
})

//show lesson by id
router.get('/course/:courseId/lesson/:lessonId', async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.lessonId);
        res.json(lesson)
    }
    catch (err) {
        res.json({ message: err })
    }
})

//delete lesson
router.delete('/course/:courseId/lesson/:lessonId', verify, async (req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.lessonId })
    const course = await Course.findOne({ _id: req.params.courseId })

    if (req.user._id == lesson.user && req.user._id == course.user){
        try {
            const removeLesson = await Lesson.remove({ _id: req.params.lessonId })
            res.json(removeLesson);
        }
        catch (err) {
            res.json({ message: err })
        }
    }
    else res.json('Access denied')
    
})

//update lesson
router.patch('/course/:courseId/lesson/:lessonId', verify, async (req, res) => {
    const lesson = await Lesson.findOne({ _id: req.params.lessonId })
    const course = await Course.findOne({ _id: req.params.courseId })

    if (req.user._id == lesson.user && req.user._id == course.user){
        try {
            const updatedLesson = await Lesson.updateOne(
                { _id: req.params.lessonId },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description
                    }
                }
            )
            res.json(updatedLesson)
        }
        catch (err) {
            res.json({ message: err })
        }
    }
    else res.json('Access denied')
    
})

module.exports = router;