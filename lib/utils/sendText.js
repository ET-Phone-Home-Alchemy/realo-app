/* eslint-disable quotes */
const nodemailer = require('nodemailer');

const carrierMap = {
  att: '@txt.att.net',
  boost: '@sms.myboostmobile.com',
  cricket: '@mms.cricketwireless.net',
  google: '@msg.fi.google.com',
  tmobile: '@tmomail.net',
  uscellular: '@email.uscc.net',
  verizon: '@vtext.com'
};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
<<<<<<< HEAD
    user: 'realoapp@gmail.com',
=======
    user: 'Realoapp@gmail.com',
>>>>>>> 7e205b275df624e074ca48b32055d966ee166dd4
    pass: `${process.env.REALO_PASSWORD}`
  }
});

const sendText = (user, message) => {

  const phoneEmail = `${user.phoneNumber}${carrierMap[user.carrier]}`;
  
  const mailOptions = {
<<<<<<< HEAD
    from: 'realoapp@gmail.com',
=======
    from: 'Realoapp@gmail.com',
>>>>>>> 7e205b275df624e074ca48b32055d966ee166dd4
    to: phoneEmail,
    subject: 'Realo',
    text: message
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendText
};

