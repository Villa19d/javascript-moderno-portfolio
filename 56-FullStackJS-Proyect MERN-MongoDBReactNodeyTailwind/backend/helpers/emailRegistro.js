import nodemailer from "nodemailer";
const emailRegistro = async (datos) => {
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
        subject: "Confirma tu cuenta",
        text: `Hola ${nombre}, confirma tu cuenta en APV haciendo clic en el siguiente enlace: ${process.env.FRONTEND_URL}/confirmar/${token}`
    });

    console.log("Mensaje enviado: %s", info.messageId);

}

export default emailRegistro;