import { createContext, useState, useEffect } from "react"
import clienteAxios from "../config/axios.jsx"
import useAuth from "../hooks/useAuth.jsx"

const PacientesContext = createContext()

const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({}) // paciente en edición
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return
                const { data } = await clienteAxios.get("/pacientes", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setPacientes(data)
            } catch (error) {
                console.error("Error al obtener pacientes:", error)
            }
        }
        if (auth?._id) obtenerPacientes()
    }, [auth])

    const guardarPaciente = async (datosPaciente) => {
        const token = localStorage.getItem("token")
        const config = { headers: { Authorization: `Bearer ${token}` } }

        if (datosPaciente.id) {
            // Editar
            try {
                const { data } = await clienteAxios.put(`/pacientes/${datosPaciente.id}`, datosPaciente, config)
                const pacientesActualizados = pacientes.map(p => p._id === data._id ? data : p)
                setPacientes(pacientesActualizados)
                return { ok: true }
            } catch (error) {
                return { ok: false, msg: error.response?.data?.error || "Error al actualizar" }
            }
        } else {
            // Nuevo
            try {
                const { data } = await clienteAxios.post("/pacientes", datosPaciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
                setPacientes([...pacientes, pacienteAlmacenado])
                return { ok: true }
            } catch (error) {
                return { ok: false, msg: error.response?.data?.error || "Error al guardar" }
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm("¿Deseas eliminar este paciente?")
        if (!confirmar) return
        const token = localStorage.getItem("token")
        try {
            await clienteAxios.delete(`/pacientes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setPacientes(pacientes.filter(p => p._id !== id))
        } catch (error) {
            console.error("Error al eliminar:", error)
        }
    }

    return (
        <PacientesContext.Provider value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente
        }}>
            {children}
        </PacientesContext.Provider>
    )
}

export { PacientesProvider }
export default PacientesContext