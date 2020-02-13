const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const verify = require('./verifyToken');



//show all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        return res.json(courses)
    }
    catch (err) {
        res.json({ message: err })
    }
});

//create course
router.post('/', verify, async(req, res) =>{  
    const course = new Course({
        user: req.user._id,
        title: req.body.title,
        description: req.body.description
    })
    console.log(course)
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
router.delete('/:courseId', verify, async (req, res) => {
    const course = await Course.findOne({ _id: req.params.courseId })

    if (req.user._id == course.user){
        try {
            const removeCourse = await Course.remove({ _id: req.params.courseId })
            res.json(removeCourse);
        }
        catch (err) {
            res.json({ message: err })
        }
    }   
    else res.json('Access denied')
})

//update course
router.patch('/:courseId', verify, async (req, res) => {
    const course = await Course.findOne({ _id: req.params.courseId })

    if (req.user._id == course.user){
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
    }   
    else res.json('Access denied')
})

module.exports = router;