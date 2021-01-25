const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')
const app = express();
app.use(cors());
const cr = require('dotenv').config()
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
  res.send("hello")
})
app.post('/send', (req, res) => {
  console.log(process.env.USERNAM, process.env.PASSWORD)
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
    port: 587,
    secure: false, // true for 465, false for other ports
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
      if (error) {
          res.send("An error occured,Please send an email to freddy980404@gmail.com");

      }

      res.send("ok");
  });
  });

app.listen(3000, () => console.log('Server started...'));