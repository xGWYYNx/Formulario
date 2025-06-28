const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

/*
    To send form data from form.html to an email, you need a backend service.
    Below is a simple example using Node.js with Express and Nodemailer.
    This code is for Form.js (your backend handler).
    Make sure to install express and nodemailer: 
        npm install express nodemailer body-parser cors
*/


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure your email transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
    }
});

app.post('/send-form', (req, res) => {
    const { name, email, message } = req.body; // Adjust fields as per your form

    const mailOptions = {
        from: email,
        to: 'destination_email@example.com',
        subject: 'New Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: error.toString() });
        }
        res.json({ success: true, info });
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});