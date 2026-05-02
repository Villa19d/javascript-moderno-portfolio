import express from "express";
import Paciente from "../models/Paciente.js";


const agregarPaciente = async (req, res) => {
    console.log("Agregando paciente..."); // Imprimimos en la consola los datos que se están recibiendo en el cuerpo de la solicitud para verificar que se están enviando correctamente.
    const paciente = new Paciente(req.body); // Creamos una nueva instancia del modelo Paciente utilizando los datos proporcionados en el cuerpo de la solicitud.
    paciente.veterinario = req.veterinario._id;
    console.log("Paciente a agregar:", paciente); // Imprimimos en la consola el paciente que se va a agregar para verificar que los datos se están recibiendo correctamente.
    try {
        const pacienteAlmacenado = await paciente.save(); // Guardamos el nuevo paciente en la base de datos y almacenamos el resultado en la variable pacienteAlmacenado.
        console.log("Paciente agregado:", pacienteAlmacenado); // Imprimimos en la consola el paciente que se ha agregado para verificar que se ha guardado correctamente.
        res.json(pacienteAlmacenado); // Respondemos con el paciente almacenado en formato JSON.
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar el paciente" }); // Si ocurre un error durante el proceso de guardado, respondemos con un mensaje de error y un código de estado 500.
    }
};

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where("veterinario").equals(req.veterinario);
    res.json(pacientes); // Respondemos con la lista de pacientes obtenida en formato JSON.
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;  // Desestructuramos el ID del paciente de los parámetros de la solicitud.
    const paciente = await Paciente.findById(id); // Buscamos el paciente en la base de datos utilizando el ID proporcionado.
    if (!paciente) {
        return res.status(404).json({ error: "Paciente no encontrado" }); // Si no se encuentra el paciente, respondemos con un mensaje de error y un código de estado 404.
    }
    res.json(paciente); // Respondemos con el paciente obtenido en formato JSON.
};

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id); // Buscamos el paciente en la base de datos utilizando el ID proporcionado.
    if (!paciente) {
        return res.status(404).json({ error: "Paciente no encontrado" }); // Si no se encuentra el paciente, respondemos con un mensaje de error y un código de estado 404.
    }
    if (paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.status(403).json({ error: "Acción no válida" }); // Si el paciente no pertenece al veterinario autenticado, respondemos con un mensaje de error y un código de estado 403.
    }
    paciente.nombre = req.body.nombre || paciente.nombre; // Actualizamos el nombre del paciente si se proporciona en el cuerpo de la solicitud, de lo contrario, mantenemos el valor actual.
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;
    try {
        const pacienteAlmacenado = await paciente.save(); // Guardamos los cambios realizados en el paciente en la base de datos y almacenamos el resultado en la variable pacienteAlmacenado.
        res.json(pacienteAlmacenado); // Respondemos con el paciente actualizado en formato JSON.
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el paciente" }); // Si ocurre un error durante el proceso de actualización, respondemos con un mensaje de error y un código de estado 500.
    }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id); // Buscamos el paciente en la base de datos utilizando el ID proporcionado.
    if (!paciente) {
        return res.status(404).json({ error: "Paciente no encontrado" }); // Si no se encuentra el paciente, respondemos con un mensaje de error y un código de estado 404.
    }
    if (paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.status(403).json({ error: "Acción no válida" }); // Si el paciente no pertenece al veterinario autenticado, respondemos con un mensaje de error y un código de estado 403.
    }
    try {
        await paciente.deleteOne(); // Eliminamos el paciente de la base de datos.
        res.json({ msj: "Paciente eliminado" }); // Respondemos con un mensaje de éxito en formato JSON.
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el paciente" }); // Si ocurre un error durante el proceso de eliminación, respondemos con un mensaje de error y un código de estado 500.
    }
}


export { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente};
