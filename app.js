const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//config routes
const coursesRoute = require('./routes/courses');
const lessonsRoute = require('./routes/lessons');
const authRoutes = require('./routes/auth');

require('dotenv/config');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("chikibobmoni")
});

app.use('/courses', coursesRoute);
app.use('/', lessonsRoute);
app.use('/user', authRoutes);

// db connect
mongoose.connect(
  process.env.DB_CONNECTION, 
  { useNewUrlParser: true,
    useUnifiedTopology: true},
  () => console.log('connected to mongoDB')
);

// mongoose.connect(
//       'mongodb://localhost/test', 
//       { useNewUrlParser: true, 
//         useUnifiedTopology: true }, () => 
//       console.log('connect to local mongoose')
// );

app.listen(3000);

