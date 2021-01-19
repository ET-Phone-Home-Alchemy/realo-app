const request = require('request');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const gmailPass = process.env.REALO_PASSWORD;
  
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'realoapp@gmail.com',
    pass: gmailPass
  }
});

const mailOptions = {
  from: 'realoapp@gmail.com',
  to: '5039578156@vtext.com',
  subject: 'Realo',
  text: 'New House Alert!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if(error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
