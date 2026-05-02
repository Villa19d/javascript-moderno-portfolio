import express from "express";
import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    try{
    const { nombre, email, password } = req.body; // Desestructuramos los datos del cuerpo de la solicitud
    const existeUsuario = await Veterinario.findOne({ email }); // Verificamos si el correo ya está registrado
    if(existeUsuario){
        console.log("El correo ya está registrado");
        return res.status(400).json({ error: "El correo ya está registrado" });
    }


    // Creamos una nueva instancia de Veterinario
    const veterinario = new Veterinario({ nombre, email, password });

    // Guardamos el veterinario en la base de datos
    await veterinario.save();

    // Enviamos el correo de registro
    await emailRegistro({ nombre, email, token: veterinario.token });

    res.status(201).json({ msj: "Veterinario registrado correctamente, Desde API/VETERINARIOS usuario registrado.  Checa tu Email para confirmar cuenta" });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Error al registrar el veterinario" });
    }

}
const perfil = (req, res) => {
    const { veterinario } = req
    if (!veterinario) {
        return res.status(404).json({ error: "Veterinario no encontrado" })
    }
    res.json({ veterinario })
}

const actualizarPerfil = async (req, res) => {
    const veterinario = await Veterinario.findById(req.veterinario._id)
    if (!veterinario) {
        return res.status(404).json({ error: "Veterinario no encontrado" })
    }
 
    // Si cambia el email, verificar que no esté en uso
    if (req.body.email && req.body.email !== veterinario.email) {
        const existeEmail = await Veterinario.findOne({ email: req.body.email })
        if (existeEmail) {
            return res.status(400).json({ error: "El email ya está en uso" })
        }
    }
 
    veterinario.nombre   = req.body.nombre   || veterinario.nombre
    veterinario.email    = req.body.email    || veterinario.email
    veterinario.web      = req.body.web      ?? veterinario.web
    veterinario.telefono = req.body.telefono ?? veterinario.telefono
 
    try {
        const veterinarioActualizado = await veterinario.save()
        res.json({
            msj: "Perfil actualizado correctamente",
            veterinario: {
                _id:      veterinarioActualizado._id,
                nombre:   veterinarioActualizado.nombre,
                email:    veterinarioActualizado.email,
                web:      veterinarioActualizado.web,
                telefono: veterinarioActualizado.telefono,
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al actualizar el perfil" })
    }
}
 

const confirmar = async (req, res) => {
    const { token } = req.params; // Aquí se extrae el token de la URL para confirmar la cuenta del veterinario.

    const usuarioConfirmar = await Veterinario.findOne({ token }); // Buscamos un veterinario que tenga el token proporcionado en la URL.
    if(!usuarioConfirmar){
        console.log("Token no válido");
        return res.status(404).json({ error: "Token no válido" });
    }else {
        // Si el usuario existe, lo confirmamos
    usuarioConfirmar.token = null; // Aquí se establece el token del usuario a null, lo que indica que la cuenta ha sido confirmada y el token ya no es necesario.
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({ msj: "Cuenta confirmada correctamente" });
    return res.status(200).json({ msj: "Token válido, cuenta confirmada" })
    };
    
    


}

const autenticar = async (req, res) => {
    const { email, password } = req.body; // Desestructuramos los datos del cuerpo de la solicitud para obtener el correo electrónico y la contraseña.
    const usuario = await Veterinario.findOne({ email }); // Buscamos un veterinario que tenga el correo electrónico proporcionado en el cuerpo de la solicitud.
    if(!usuario){
        console.log("El usuario no existe");
        return res.status(404).json({ error: "El usuario no existe" });
    }else {
        console.log("Usuario encontrado, autenticando..."); 
    }

    if(!usuario.confirmado){
        console.log("Cuenta no confirmada");
        return res.status(403).json({ error: "Cuenta no confirmada" });
    }

    //Revisar la contraseña
    if(await usuario.comprobarPassword(password)){
        console.log("Contraseña correcta, autenticación exitosa");
        const token = generarJWT(usuario._id);
        res.json({ msj: "Autenticación exitosa", token });
    }else{
        console.log("Contraseña incorrecta");
        res.status(401).json({ error: "Contraseña incorrecta" });
    }
}


const olvidePassword = async (req, res) => {
    const { email } = req.body; // Desestructuramos el correo electrónico del cuerpo de la solicitud.
    const existeusuario = await Veterinario.findOne({ email }); // Buscamos un veterinario que tenga el correo electrónico proporcionado en el cuerpo de la solicitud.
    if(!existeusuario){
        console.log("El usuario no existe");
        return res.status(404).json({ error: "El usuario no existe" });
    }else {
        try{
            existeusuario.token = generarId(); // Generamos un nuevo token para el usuario utilizando la función generarId() y lo asignamos al campo token del usuario.
            await existeusuario.save(); // Guardamos los cambios en la base de datos.
            
            //Enviar correo con instrucciones para reestablecer la contraseña
            emailOlvidePassword({
                nombre: existeusuario.nombre,
                email: existeusuario.email,
                token: existeusuario.token
            });

            return res.json({ msj: "Se ha enviado un correo con las instrucciones para restablecer la contraseña" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al generar el token" });
        }

    }

}

const nuevoPassword = async (req, res) => {
   const { token } = req.params; // Aquí se extrae el token de la URL para verificar su validez.
    const { password } = req.body; // Desestructuramos la nueva contraseña del cuerpo de la solicitud.
    const usuario = await Veterinario.findOne({ token }); // Buscamos un veterinario que tenga el token proporcionado en la URL.
    if(!usuario){
        console.log("Token no válido");
        return res.status(404).json({ error: "Token no válido" });
    }
    try{
        usuario.password = password; // Aquí se asigna la nueva contraseña al campo password del usuario.
        usuario.token = null; // Aquí se establece el token del usuario a null, lo que indica que el token de recuperación de contraseña ya no es necesario después de restablecer la contraseña.
        await usuario.save(); // Guardamos los cambios en la base de datos.
        return res.json({ msj: "Contraseña restablecida correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al restablecer la contraseña" });
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params; // Aquí se extrae el token de la URL para verificar su validez.
    const tokenValido = await Veterinario.findOne({ token });
    if(tokenValido){
        console.log("Token válido");
        return res.status(200).json({ msj: "Token válido" });
    }else {
        console.log("Token no válido");
        return res.status(404).json({ error: "Token no válido" });
    }
}

const cambiarPassword = async (req, res) => {
    const { passwordActual, nuevoPassword } = req.body
    const veterinario = await Veterinario.findById(req.veterinario._id)
    if (!veterinario) {
        return res.status(404).json({ error: "Veterinario no encontrado" })
    }
 
    // Verificar password actual
    const passwordCorrecto = await veterinario.comprobarPassword(passwordActual)
    if (!passwordCorrecto) {
        return res.status(403).json({ error: "El password actual es incorrecto" })
    }
 
    veterinario.password = nuevoPassword
    try {
        await veterinario.save()
        res.json({ msj: "Password actualizado correctamente" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al cambiar el password" })
    }
}


export {
    registrar, perfil, confirmar, autenticar,  olvidePassword, nuevoPassword, comprobarToken, cambiarPassword,actualizarPerfil 
}