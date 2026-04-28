import { useState } from "react"
import clienteAxios from "../config/axios.jsx"
import Alerta from "../components/Alerta.jsx"

const CambiarPassword = () => {
    const [passwordActual, setPasswordActual] = useState("")
    const [nuevoPassword, setNuevoPassword] = useState("")
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([passwordActual, nuevoPassword].includes("")) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return
        }
        if (nuevoPassword.length < 6) {
            setAlerta({ msg: "El nuevo password debe tener al menos 6 caracteres", error: true })
            return
        }

        try {
            const token = localStorage.getItem("token")
            const { data } = await clienteAxios.put(
                "/veterinarios/cambiar-password",
                { passwordActual, nuevoPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setAlerta({ msg: data.msj || "Password actualizado correctamente", error: false })
            setPasswordActual("")
            setNuevoPassword("")
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.error || "Error al cambiar el password",
                error: true
            })
        }
        setTimeout(() => setAlerta({}), 3000)
    }

    return (
        <>
            <h2 className="font-black text-3xl text-center">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu{" "}
                <span className="text-indigo-600 font-bold">password aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-10">
                    {alerta.msg && <Alerta alert={alerta} />}

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                placeholder="Escribe tu password actual"
                                value={passwordActual}
                                onChange={e => setPasswordActual(e.target.value)}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Nuevo Password</label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                placeholder="Escribe tu nuevo password"
                                value={nuevoPassword}
                                onChange={e => setNuevoPassword(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Actualizar Password"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer transition-colors"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CambiarPassword