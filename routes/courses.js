const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const verify = require('./verifyToken');
const querymen = require('querymen');


//show all courses
router.get('/', querymen.middleware(), async function(req, res) {
    try {
        var query = req.querymen;
        const courses = await Course.find(query.query, query.select, query.cursor);
        return res.json(courses)
    }
    catch (err) {
        res.json({ message: err })
    }
});

//create course
router.post('/', verify, async function(req, res) {  
    const course = new Course({
        user: req.user._id,
        title: req.body.title,
        description: req.body.description
    })

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
    try {
        const course = await Course.findOne({ _id: req.params.courseId })

        if (req.user._id == course.user){
            const removeCourse = await Course.remove({ _id: req.params.courseId })
            res.json(removeCourse);
        }   
        else res.json('Access denied')
    }
    catch (err) {
        res.json({ message: err })
    }
        
})

//update course
router.patch('/:courseId', verify, async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.courseId })

        if (req.user._id == course.user){
            const updatedCourse = await Course.updateOne(
                { _id: req.params.courseId },
                { $set: { title: req.body.title,
                        description: req.body.description } }
            )
            res.json(updatedCourse)
        }   
        else res.json('Access denied')
    }
    catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;