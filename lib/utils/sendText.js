const request = require('request');
const nodemailer = require('nodemailer');
const User = require('../models/User');
  
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'realoapp@gmail.com',
    pass: `${process.env.REALO_PASSWORD}`
  }
});

// let alertText = `A new home matching ${filter.name} is up! ${filter.link}`;

const userConfirmation = {
  from: 'realoapp@gmail.com',
  to: `${User.phoneNumber}@vtext.com`,
  subject: 'Realo',
  text: 'Welcome to Realo!'
};

transporter.sendMail(userConfirmation, (error, info) => {
  if(error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
