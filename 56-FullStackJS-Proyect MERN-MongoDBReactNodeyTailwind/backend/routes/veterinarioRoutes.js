import express from "express";
const router = express.Router();
import { registrar, perfil, confirmar, autenticar, olvidePassword, nuevoPassword, comprobarToken, cambiarPassword, actualizarPerfil} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

//area publica
router.post("/", registrar);
router.get("/confirmar/:token",confirmar) // :token es un parámetro dinámico que se extraerá de la URL para confirmar la cuenta del veterinario.
router.post("/login", autenticar) // Ruta para autenticar al veterinario, se espera que el veterinario envíe sus credenciales (correo electrónico y contraseña) en el cuerpo de la solicitud para iniciar sesión.

router.post("/olvide-password", olvidePassword) // Ruta para manejar la solicitud de recuperación de contraseña, donde el veterinario puede enviar su correo electrónico para recibir instrucciones sobre cómo restablecer su contraseña.
router.get("/olvide-password/:token", comprobarToken) // Ruta para verificar el token de recuperación de contraseña, donde se espera que el veterinario acceda a esta ruta con un token válido para restablecer su contraseña.
router.post("/olvide-password/:token", nuevoPassword) // Ruta para establecer una nueva contraseña, donde se espera que el veterinario envíe su nueva contraseña junto con el token de recuperación para actualizar su contraseña en la base de datos.



//area privada
router.get("/perfil", checkAuth, perfil);
router.put("/perfil", checkAuth, actualizarPerfil);
router.put("/cambiar-password",checkAuth, cambiarPassword)

export default router;