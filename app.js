const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const coursesRoute = require('./routes/courses');

require('dotenv/config');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("chikibobmoni")
});

app.use('/courses', coursesRoute);

//db connect
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true,
      useUnifiedTopology: true},
    () => console.log('connected to mongoDB')
);

app.listen(3000);

