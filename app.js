var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const { check, validationResult } = require('express-validator/check');

var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Global Vars
app.use((req, res, next) => {
    res.locals.errors = null;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(3000, () => {
    console.log("Server Started on Port 3000...");
});