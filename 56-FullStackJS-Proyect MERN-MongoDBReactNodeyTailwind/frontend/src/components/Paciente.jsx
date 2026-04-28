import usePacientes from "../hooks/usePacientes.jsx"

const Paciente = ({ paciente }) => {
    const { nombre, propietario, email, fecha, sintomas, _id } = paciente
    const { setEdicion, eliminarPaciente } = usePacientes()

    const fechaFormateada = new Date(fecha).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-indigo-700 my-2">
                Nombre: <span className="font-normal normal-case text-black">{nombre}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">
                Propietario: <span className="font-normal normal-case text-black">{propietario}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">
                Email: <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">
                Fecha Alta: <span className="font-normal normal-case text-black">{fechaFormateada}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">
                Síntomas: <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className="flex justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg transition-colors"
                    onClick={() => setEdicion(paciente)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg transition-colors"
                    onClick={() => eliminarPaciente(_id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente