const { credentials } = require('../config')
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
   host: 'smtp.sendgrid.net',
   port: 587,
   auth: {
       user: "apikey",
       pass: credentials.sendgrid.apiKey
   }
})

exports.send = async (emailAddress) => {
  transporter.sendMail({
    from: "judsonmelobandeira@gmail.com", // verified sender email
    to: emailAddress, // recipient email
    subject: "Test message subject", // Subject line
    text: "Hello world!", // plain text body
    html: "<b>Hello world!</b>", // html body
  }, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}