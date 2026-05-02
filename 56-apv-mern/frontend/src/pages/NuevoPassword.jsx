import { useState,useEffect} from "react"
import clienteAxios from "../config/axios.jsx"
import Alert from "../components/Alerta.jsx"
import { Link, useParams } from "react-router-dom"

const NuevoPassword = () => {
    const [tokenValido, setTokenValido] = useState(false);
    const { token } = useParams(); // Obtenemos el token de los parámetros de la URL
    const [alerta, setAlerta] = useState({}); // Estado para almacenar mensajes de alerta
    const [password, setPassword] = useState(""); // Estado para almacenar el nuevo password ingresado por el usuario
    const [passwordModificado, setPasswordModificado] = useState(false); // Estado para indicar si el password ha sido modificado exitosamente  

    useEffect(() => {
        console.log("Token recibido como parámetro:", token); // Imprimimos el token en la consola para verificar que se ha recibido correctamente.
        const verificarToken = async () => {
            try {
                const url = `${clienteAxios.defaults.baseURL}/veterinarios/olvide-password/${token}`; // Construimos la URL para verificar el token utilizando la variable de entorno VITE_REACT_APP_BACKEND_URL y el token extraído de los parámetros de la URL.
                const { data } = await clienteAxios.get(url); // Realizamos una solicitud GET a la URL construida para verificar el token y almacenamos la respuesta en la variable data.
                console.log("Respuesta desde el backend al verificar el token:", data); // Imprimimos la respuesta en la consola para verificar que el token es válido.
                setTokenValido(true); // Si la solicitud es exitosa, establecemos tokenValido en true para indicar que el token es válido.
                setAlerta({ msg: "Token válido. Puedes restablecer tu contraseña.", tipo: "exito" });
            } catch (error) {
                console.error("Error al verificar el token:", error); // Si ocurre un error durante el proceso de verificación del token, lo imprimimos en la consola para su depuración.
                setTokenValido(false); // Si ocurre un error, establecemos tokenValido en false para indicar que el token no es válido.
            }
        }
        verificarToken(); // Llamamos a la función verificarToken para iniciar el proceso de verificación del token usando recursividad
    }, [token]); // El efecto se ejecutará cada vez que el token cambie, lo que permite verificar el token correctamente incluso si se actualiza en la URL.

     const handleSubmit = async (e) => {
        e.preventDefault();
        if(!password.trim()) {
            setAlerta({ msg: "El password es obligatorio.", tipo: "error" });
            return;
        }
        if(password.length < 6) {
            setAlerta({ msg: "El password debe tener al menos 6 caracteres.", tipo: "error" });
            return;
        }
        try{
            const url = `${clienteAxios.defaults.baseURL}/veterinarios/olvide-password/${token}`; // Construimos la URL para restablecer la contraseña utilizando la variable de entorno VITE_REACT_APP_BACKEND_URL y el token extraído de los parámetros de la URL.
            const { data } = await clienteAxios.post(url, { password }); // Realizamos una solicitud POST a la URL construida para restablecer la contraseña, enviando el nuevo password en el cuerpo de la solicitud, y almacenamos la respuesta en la variable data.
            console.log("Respuesta desde el backend al restablecer la contraseña:", data); // Imprimimos la respuesta en la consola para verificar que la contraseña se ha restablecido correctamente.
            setAlerta({ msg: data.msg || "Contraseña restablecida correctamente.", tipo: "exito" }); // Si la solicitud es exitosa, establecemos una alerta con el mensaje recibido del backend o un mensaje por defecto indicando que la contraseña se ha restablecido correctamente.
            setPasswordModificado(true); // Establecemos el estado a true para indicar que el password ha sido modificado exitosamente.
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error); // Si ocurre un error durante el proceso de restablecimiento de contraseña, lo imprimimos en la consola para su depuración.
            setAlerta({ msg: "Error al restablecer la contraseña.", tipo: "error" }); // Si ocurre un error, establecemos una alerta con un mensaje de error.
        }

    }


    return (
        <>
        <div>
            <h1 className="text-3xl font-bold text-blue-500">Reestablece tu password y no pierdas acceso a tus pacientes</h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                {alerta.msg && <Alert alert={alerta}/>} {/* Aquí se renderiza el componente Alert, pasando la alerta actual como una prop. Esto permite mostrar mensajes de error o éxito al usuario durante el proceso de restablecimiento de contraseña, dependiendo del estado de la alerta. */ }
                <div className="my-5">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                    <input id="password" type="password" placeholder="Escribe tu nuevo password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type="submit" value="Reestablecer Password" className="bg-blue-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-800 transition-colors"/>
            </form>
        </div>
        
        {passwordModificado && (
            <div className="mt-10 text-center">
                <Link to="/" className="text-blue-500 hover:underline">Inicia sesión con tu nueva contraseña</Link>
            </div>
        )}
        </>
    )
}

export default NuevoPassword

