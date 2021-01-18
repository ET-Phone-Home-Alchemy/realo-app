const request = require('request');
// const cherrio = require('cherrio');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REALO_EMAIL,
    pass: process.env.REALO_PASSWORD
  }
});

var mailOptions = {
  from: process.env.REALO_EMAIL,
  to: '5038512867@txt.att.net',
  subject: 'another test',
  text: 'did this work?'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
