import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function testEmail() {
    try {
        console.log("Intentando conectar a Gmail localmente...");
        const info = await transport.sendMail({
            from: "Prueba <" + process.env.EMAIL_USER + ">",
            to: process.env.EMAIL_USER,
            subject: "Prueba de Nodemailer Local",
            text: "Si recibes esto, tu configuración de Gmail funciona perfectamente localmente."
        });
        console.log("¡Éxito! Mensaje enviado localmente:", info.messageId);
    } catch (error) {
        console.error("Error al enviar localmente:", error);
    }
}

testEmail();
