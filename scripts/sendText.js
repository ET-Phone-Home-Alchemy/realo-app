const request = require('request');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'realoapp@gmail.com',
    pass: 'Alchemy2021'
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
