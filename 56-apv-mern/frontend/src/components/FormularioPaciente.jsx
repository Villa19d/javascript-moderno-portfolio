import { useState, useEffect } from "react"
import usePacientes from "../hooks/usePacientes.jsx"
import Alerta from "./Alerta.jsx"

const FormularioPaciente = () => {
    const [nombre, setNombre] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [fecha, setFecha] = useState("")
    const [sintomas, setSintomas] = useState("")
    const [id, setId] = useState(null)
    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente, setEdicion } = usePacientes()

    // Llenar formulario cuando se va a editar
    useEffect(() => {
        if (paciente?._id) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha?.substring(0, 10))
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const limpiarFormulario = () => {
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
        setId(null)
        setEdicion({})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return
        }
        const resultado = await guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
        if (resultado.ok) {
            setAlerta({ msg: id ? "Paciente actualizado correctamente" : "Paciente agregado correctamente", error: false })
            limpiarFormulario()
        } else {
            setAlerta({ msg: resultado.msg, error: true })
        }
        setTimeout(() => setAlerta({}), 3000)
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">
                {id ? "Editar Paciente" : "Añadir Pacientes"}
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
                {id ? "Modifica los datos del" : "Añade tus"}{" "}
                <span className="text-indigo-600 font-bold">pacientes y adminístralos</span>
            </p>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {alerta.msg && <Alerta alert={alerta} />}

                <div className="mb-5">
                    <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email Propietario
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los síntomas del paciente"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md"
                    value={id ? "Guardar Cambios" : "Agregar Paciente"}
                />

                {id && (
                    <button
                        type="button"
                        onClick={limpiarFormulario}
                        className="mt-3 bg-gray-400 w-full p-3 text-white uppercase font-bold hover:bg-gray-500 cursor-pointer transition-colors rounded-md"
                    >
                        Cancelar Edición
                    </button>
                )}
            </form>
        </div>
    )
}

export default FormularioPaciente