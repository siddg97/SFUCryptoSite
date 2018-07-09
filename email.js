'use strict';

require("dotenv").config();
const nodemailer = require('nodemailer');

// console.log("EMAIL_USER = " + process.env.EMAIL_USER);
// console.log("EMAIL_PASS = " + process.env.EMAIL_PASS);

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER, // generated ethereal user
//         pass: process.env.EMAIL_PASS // generated ethereal password
//     }
// });

let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS // generated ethereal password
    }
});

// // setup email data with unicode symbols
// let mailOptions = {
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: 'vinsonly@live.ca, vinsonl@sfu.ca', // list of receivers
//     subject: '[Fred Foo] SFU Cryptocurrency Club Inquiry', // Subject line
//     text: 'Hello world?', // plain text body
//     // html: '<b>Hello world?</b>' // html body
// };

// send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// });

module.exports = transporter;