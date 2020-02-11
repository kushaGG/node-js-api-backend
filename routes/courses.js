const express = require('express');
const router = express.Router();
const Course = require('../models/Course');


//show all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses)
    }
    catch (err) {
        res.json({ message: err })
    }
});

//create course
router.post('/', async (req, res) =>{
    const course = new Course({
        title: req.body.title,
        description: req.body.description
    })
    console.log(req.body)
    try {
        const savedCourse = await course.save();
        res.json(savedCourse);
    } catch (err) {
        res.json({message:err})
    }
})

//show course by id
router.get('/:courseId', async (req, res) =>{
    try {
        const course = await Course.findById(req.params.courseId);
        res.json(course)
    }
    catch (err) {
        res.json({ message: err })
    }
})

//delete course
router.delete('/:courseId', async (req, res) => {
    try {
        const removeCourse = await Course.remove({ _id: req.params.courseId })
        res.json(removeCourse);
    }
    catch (err) {
        res.json({ message: err })
    }
})

//update course
router.patch('/:courseId', async (req, res) => {
    try {
        const updatedCourse = await Course.updateOne(
            { _id: req.params.courseId },
            { $set: { title: req.body.title,
                      description: req.body.description } }
        )
        res.json(updatedCourse)
    }
    catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;