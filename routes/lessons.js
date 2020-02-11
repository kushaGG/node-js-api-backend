const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');

router.get('/course/:courseId/lessons', async (req, res) => {
    try {
        const lessons = await Lesson.find({ course: { $eq: req.params.courseId } });
        res.json(lessons)
    }
    catch (err) {
        res.json({ message: err })
    }   
});

//create course
router.post('/course/:courseId/lessons', async (req, res) => {
    const lesson = new Lesson({
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

//show course by id
router.get('/course/:courseId/lesson/:lessonId', async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.lessonId);
        res.json(lesson)
    }
    catch (err) {
        res.json({ message: err })
    }
})

//delete course
router.delete('/course/:courseId/lesson/:lessonId', async (req, res) => {
    try {
        const removeLesson = await Lesson.remove({ _id: req.params.lessonId })
        res.json(removeLesson);
    }
    catch (err) {
        res.json({ message: err })
    }
})

//update course
router.patch('/course/:courseId/lesson/:lessonId', async (req, res) => {
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
})

module.exports = router;