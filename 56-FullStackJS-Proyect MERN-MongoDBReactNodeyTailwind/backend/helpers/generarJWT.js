import  jsonwebtoken from "jsonwebtoken"; // Importamos la biblioteca jsonwebtoken para generar tokens JWT. Esta biblioteca proporciona funciones para crear y verificar tokens JWT de manera segura.
const generarJWT = (id) => {
    return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" }); // Aquí se genera un token JWT real utilizando la clave secreta del entorno.
}   

export default generarJWT;