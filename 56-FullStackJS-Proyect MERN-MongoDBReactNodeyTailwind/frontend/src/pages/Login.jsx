import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import { useState } from "react";
import clienteAxios from "../config/axios.jsx";
import Alert from "../components/Alerta.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const { autenticarUsuario } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();
        if(email === "" || password === ""){
            setAlerta({msg: "Todos los campos son obligatorios", error: true, type: 'red'})
            return
        }
        try {
            const {data} = await clienteAxios.post("/veterinarios/login", {email, password})
            console.log("Respuesta del backend al iniciar sesión:", data);
            //Almacenanado en cookies el token de autenticación para mantener la sesión del usuario activa. Esto permite que el usuario permanezca autenticado incluso después de cerrar y volver a abrir la aplicación, facilitando el acceso a las funcionalidades protegidas sin necesidad de iniciar sesión nuevamente.
            localStorage.setItem("token", data.token) // Almacena el token de autenticación en el almacenamiento local del navegador utilizando localStorage.setItem. Esto permite que el token esté disponible para futuras solicitudes al backend, lo que facilita la autenticación y autorización del usuario en la aplicación.
            await autenticarUsuario()
            setAlerta({msg: "Inicio de sesión exitoso", error: false, type: 'green'})
            navigate("/admin") // Redirige al usuario a la página de administración después de un inicio de sesión exitoso utilizando la función navigate del hook useNavigate de React Router. Esto permite que el usuario acceda a las funcionalidades protegidas de la aplicación después de autenticarse correctamente.
        } catch (error) {
            console.error("Error al iniciar sesión:", error.response);
            setAlerta({msg: error.response.data.error, error: true, type: 'red'})
        }
    }

    return (
        <>
           <div>
              <h1 className="text-3xl font-bold text-blue-500">Inicia sesion de Administrar tus <span className="text-blue-600">Pacientes</span> </h1>
           </div>
           <div>
              {alerta.msg && <Alert alert={alerta}/>}
              <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
                 <div className="my-5">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
                 </div>
                 <div className="my-5">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
                 </div>
                 <input type="submit" value="Iniciar Sesion" className="bg-blue-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-800 transition-colors"/>
              </form>
              <nav className="lg:flex lg:justify-between">
                 <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Registrate</Link>
                 <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvide mi password</Link>
              </nav>
           </div>
        </>
    )
}

export default Login