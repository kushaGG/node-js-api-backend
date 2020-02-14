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

app.use('/courses', coursesRoute);
app.use('/', lessonsRoute);
app.use('/user', authRoutes);
app.get('/', (req, res) =>{
  res.json('home page')
})


//express midlleware error handle
app.use(function(req, res){
  res.status(404).json('Page not found')
})

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({error: err.message});
});
//express midlleware error handle


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

