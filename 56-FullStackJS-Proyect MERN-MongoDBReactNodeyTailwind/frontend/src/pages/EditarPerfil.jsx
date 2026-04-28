import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth.jsx"
import clienteAxios from "../config/axios.jsx"
import Alerta from "../components/Alerta.jsx"

const EditarPerfil = () => {
    const { auth, setAuth } = useAuth()

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [web, setWeb] = useState("")
    const [telefono, setTelefono] = useState("")
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setNombre(auth?.nombre || "")
        setEmail(auth?.email || "")
        setWeb(auth?.web || "")
        setTelefono(auth?.telefono || "")
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([nombre, email].includes("")) {
            setAlerta({ msg: "Nombre y email son obligatorios", error: true })
            return
        }

        try {
            const token = localStorage.getItem("token")
            const { data } = await clienteAxios.put(
                "/veterinarios/perfil",
                { nombre, email, web, telefono },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setAuth(data.veterinario ?? data)
            setAlerta({ msg: "Perfil actualizado correctamente", error: false })
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.error || "Error al actualizar perfil",
                error: true
            })
        }
        setTimeout(() => setAlerta({}), 3000)
    }

    return (
        <>
            <h2 className="font-black text-3xl text-center">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu{" "}
                <span className="text-indigo-600 font-bold">información aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-10">
                    {alerta.msg && <Alerta alert={alerta} />}

                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Nombre</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={web}
                                onChange={e => setWeb(e.target.value)}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Teléfono</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={telefono}
                                onChange={e => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer transition-colors"
                        />
                    </form>

                    <div className="mt-5 text-center">
                        <Link
                            to="/admin/cambiar-password"
                            className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                        >
                            Cambiar mi password
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil