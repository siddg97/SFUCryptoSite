var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const { check, validationResult } = require('express-validator/check');
var email = require('./email.js');

var app = express();

const port = process.env.PORT || 3000;


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

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
})

app.get('/sfu_coin', (req, res) => {
    res.sendFile(__dirname + '/views/sfucoin.html');
})

app.post('/send_contact_us_email', (req, res) => {
    console.log(req.body);

    // setup email data with unicode symbols
    let mailOptions = {
        from: `${req.body.name} <${req.body.email}>`, // sender address
        to: 'sfucrypto@gmail.com', // list of receivers
        subject: `[${req.body.name}] Club Inquiry`, // Subject line
        text: req.body.message, // plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    email.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send(error);
        } else {
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return res.status(201).send('Message sent: %s', info.messageId);
        }
    });
})

app.listen(port, () => {
    console.log(`Server Started on Port ${port}...`);
});