import nodemailer from "nodemailer";
const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST?.trim(),
        port: Number(process.env.EMAIL_PORT),
        secure: Number(process.env.EMAIL_PORT) === 465, // Force to Number to avoid string mismatch
        auth: {
            user: process.env.EMAIL_USER?.trim(),
            pass: process.env.EMAIL_PASS?.trim()
        }
    });

    const { nombre, email, token } = datos;

    // Limpiamos la URL para que no haya diagonales dobles si la variable de entorno la tiene
    const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, '').trim();

    // Enviamos el correo de registro
    const info = await transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria <apv@veterinaria.com>",
        to: email,
        subject: "Confirma tu cuenta",
        text: `Hola ${nombre}, confirma tu cuenta en APV haciendo clic en el siguiente enlace: ${frontendUrl}/confirmar/${token}`
    });

    console.log("Mensaje enviado: %s", info.messageId);

}

export default emailRegistro;