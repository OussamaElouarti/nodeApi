const express = require('express');
const mongoose = require('mongoose');
const { isMatch } = require('lodash');
const Users = require('./models/Users');
const Notes = require('./models/notes');
const bodyParser = require('body-parser');
const signupRouter = require('./models/signuppost');
const loginRouter = require('./models/loginposts');
const tasksRouter = require('./models/taskposts');
const deleteRouter = require('./models/deletetasks');

// express app
const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/addtasks', tasksRouter);
app.use('/deletetasks', deleteRouter);

// connect to mongodb
const dbURI = 'mongodb+srv://gokakyuu:1234@nodecourse.clpgx.mongodb.net/apidb?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(1337))
    .catch((err) => console.log(err));

