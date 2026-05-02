import jwt from "jsonwebtoken"; // Importamos la biblioteca jsonwebtoken para trabajar con tokens JWT. Esta biblioteca proporciona funciones para crear y verificar tokens JWT de manera segura.
import Veterinario from "../models/Veterinario.js";

// Middleware de autenticación para proteger rutas privadas. Este middleware se encargará de verificar la validez del token JWT enviado en la cabecera de autorización de la solicitud y, si es válido, permitirá el acceso a las rutas protegidas.
const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization; // Aquí se extrae el token de la cabecera de autorización de la solicitud HTTP. La cabecera de autorización generalmente tiene el formato "Bearer <token>".
    if(!authHeader){
        return res.status(401).json({ error: "Token no proporcionado" }); // Si no se proporciona un token en la cabecera de autorización, se devuelve una respuesta con un estado 401 (No autorizado) y un mensaje de error indicando que el token no fue proporcionado.
    }   
    const token = authHeader.split(" ")[1]; // Aquí se divide la cadena de la cabecera de autorización en dos partes utilizando el espacio como separador. La primera parte es "Bearer" y la segunda parte es el token real. Se extrae el token real para su posterior verificación.
    if(!token){
        return res.status(401).json({ error: "Token no proporcionado" }); // Si después de dividir la cabecera de autorización no se encuentra un token válido, se devuelve una respuesta con un estado 401 (No autorizado) y un mensaje de error indicando que el token no fue proporcionado.
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Aquí se utiliza la función jwt.verify() para verificar la validez del token utilizando la clave secreta definida en las variables de entorno. Si el token es válido, se decodifica y se obtiene la información contenida en él.
        req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado -__v"); // Aquí se busca en la base de datos un veterinario que coincida con el ID decodificado del token. Se utiliza .select() para excluir ciertos campos sensibles como la contraseña, el token, el estado de confirmación y la versión del documento.
        console.log("Token válido, veterinario autenticado:", req.veterinario); // Imprimimos en la consola la información del veterinario autenticado para verificar que se ha obtenido correctamente.
        next();
        // return res.status(200).json({
        // msj: "Token válido, autorización concedida",
        // veterinario: req.veterinario
        // });
    } catch (error) {
        return res.status(401).json({ error: "Token no válido" }); // Si el token no es válido o ha expirado, se devuelve una respuesta con un estado 401 (No autorizado) y un mensaje de error indicando que el token no es válido.
    }
};

export default checkAuth;