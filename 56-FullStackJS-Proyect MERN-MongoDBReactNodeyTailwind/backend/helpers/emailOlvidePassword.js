import nodemailer from "nodemailer";
const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { nombre, email, token } = datos;

    // Enviamos el correo de registro
    const info = await transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria <apv@veterinaria.com>",
        to: email,
        subject: "Resetea tu contraseña",
        text: `Hola ${nombre}, haz clic en el siguiente enlace para resetear tu contraseña: ${process.env.FRONTEND_URL}/olvide-password/${token} 
        Si tu no solicitaste este cambio, puedes ignorar este mensaje.`
    });

    console.log("Mensaje enviado: %s", info.messageId);

}

export default emailOlvidePassword;