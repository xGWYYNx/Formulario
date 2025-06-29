const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura el transporter con tus credenciales de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dilanmateop@gmail.com',
        pass: 'Millonarios3@#!'
    }
});

// ...tu código existente para app.post('/send-form')...

app.post('/send-form', (req, res) => {
    // Get all fields from the request body
    const {
        name, age, gender, education, occupation, date,
        email, phone, city, marital_status, income, comments
    } = req.body;

    // Build the email content with all fields
    const mailOptions = {
        from: email,
        to: 'elviolapablos@gmail.com', // 
        subject: 'Nuevo envío de formulario de muestra estadística',
        text: `
Nombre: ${name}
Edad: ${age}
Género: ${gender}
Nivel de Educación: ${education}
Ocupación: ${occupation}
Fecha de Participación: ${date}
Correo electrónico: ${email}
Teléfono: ${phone}
Ciudad: ${city}
Estado civil: ${marital_status}
Ingresos mensuales (COP): ${income}
Comentarios adicionales: ${comments}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: error.toString() });
        }
        res.json({ success: true, info });
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// ...existing code...