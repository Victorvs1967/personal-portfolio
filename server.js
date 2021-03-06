const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const initialPath = path.join(__dirname, 'public');
const app = express();

app.use(express.static(initialPath));
app.use(express.json());

app.listen(3000, () => console.log('lisening...'));

app.get('/', (req, res) => res.sendFile(path.join(initialPath, 'index.html')));

app.post('/mail', (req, res) => {
  const { firstname, lastname, email, msg } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: 'about portfolio',
    text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage:\n ${msg}`
  };

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
      res.json('opps! it seems like some error occured plz. try again.');
    } else {
      res.json('thanks for e-mailing me. i will replay to you within 2 working days.');
    }
  });
});
