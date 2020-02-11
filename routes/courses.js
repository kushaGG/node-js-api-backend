const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', (req, res) => {
    res.send("Course chikibobmoni")
});

router.post('/', (req, res) =>{
    const course = new Course({
        title: req.body.title,
        description: req.body.description
    })
    console.log(req.body)
    course.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err })
        })
})

module.exports = router;