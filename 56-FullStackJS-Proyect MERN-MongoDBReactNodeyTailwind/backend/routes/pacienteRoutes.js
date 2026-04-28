import express from "express";
import Veterinario from "../models/Veterinario.js";
import Paciente from "../models/Paciente.js";
import { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente } from "../controllers/pacienteController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();



//area publica
router.post("/", checkAuth, agregarPaciente);
router.get("/", checkAuth, obtenerPacientes) // Ruta para obtener todos los pacientes asociados al veterinario autenticado, se espera que el veterinario acceda a esta ruta después de iniciar sesión correctamente para obtener la lista de sus pacientes.
router.get("/:id", checkAuth, obtenerPaciente) // Ruta para obtener un paciente específico por su ID, se espera que el veterinario acceda a esta ruta con el ID del paciente para obtener los detalles de ese paciente en particular.
router.put("/:id", checkAuth, actualizarPaciente) // Ruta para actualizar la información de un paciente específico por su ID, se espera que el veterinario acceda a esta ruta con el ID del paciente y los datos actualizados en el cuerpo de la solicitud para modificar la información del paciente en la base de datos.
router.delete("/:id", checkAuth, eliminarPaciente) // Ruta para eliminar un paciente específico por su ID, se espera que el veterinario acceda a esta ruta con el ID del paciente para eliminarlo de la base de datos.



export default router;