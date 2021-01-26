const express = require("express")
const path = require('path')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config()
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const resumePath = path.join(__dirname, 'public/resume/Freddy.pdf');
app.get("/resume", (req, res) => {
    res.sendFile(resumePath)
});

app.post('/send', (req, res) => {
  const {name,email,tel,message}  = req.body
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Phone: ${tel}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
  `;
  //res.send(output)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // false for 587, false for other ports
    auth: {
        user: process.env.USERNAM, // generated ethereal user
        pass: process.env.PASSWORD  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  
  // setup email data with unicode symbols
  let mailOptions = {
      from: email, // sender address
      to: 'freddy980404@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Portfolio Message', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      let response;
      if (error) {
         console.log(error);
        response = {"response":"An error occured,Please send an email to freddy980404@gmail.com"};

      }
      else{
        response = {"response":"ok"};
      }
      
      res.send(JSON.stringify(response));
  });
  });


const PORT = process.env.PORT || 3000
app.listen(PORT);
