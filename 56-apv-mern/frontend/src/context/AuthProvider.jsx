import {} from "react"
import { createContext, useState, useEffect } from "react"
import clienteAxios from "../config/axios.jsx"
import {useNavigate} from "react-router-dom"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const autenticarUsuario = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            setCargando(false)
            return
        }
        try {
            const { data } = await clienteAxios.get("/veterinarios/perfil", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAuth(data.veterinario)
            console.log("Usuario autenticado:", data.veterinario); // Imprime los datos del usuario autenticado en la consola para verificar que se ha autenticado correctamente.
        } catch (error) {
            console.error("Error al autenticar usuario:", error.response);
            setAuth({})
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        autenticarUsuario()
    }, [])

    const cerrarSesion = ()=>{
        localStorage.removeItem("token")
        setAuth({})
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, cargando, cerrarSesion, autenticarUsuario }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext