import { Link } from "react-router-dom"
import {useState, useEffect} from "react"
import Alert from "../components/Alerta.jsx"
import clienteAxios from "../config/axios.jsx"

const Registrar = () => {
    const [nombre, setNombre] = useState("") // useState para el nombre del usuario que se va a registrar. El valor inicial es una cadena vacía. La función setNombre se utiliza para actualizar el estado del nombre a medida que el usuario ingresa su información en el formulario de registro.
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")

    const [alerta, setAlerta] = useState({}) // useState para manejar las alertas que se mostrarán al usuario durante el proceso de registro. El valor inicial es un objeto vacío. La función setAlerta se utiliza para actualizar el estado de la alerta con mensajes de error o éxito según sea necesario.
    const handleSubmit = async e => {
        e.preventDefault() // Evita que el formulario se envíe de forma predeterminada, lo que permite manejar el envío del formulario de manera personalizada.
        console.log("Enviando formulario...") // Imprime un mensaje en la consola para indicar que el formulario se está enviando.

        //validando 
        if([nombre, email, password, repetirPassword].includes("")){
            console.log("Todos los campos son obligatorios");
            setAlerta({msg: "Todos los campos son obligatorios", error: true, type: 'red'}) // Si alguno de los campos (nombre, email, password, repetirPassword) está vacío, se establece una alerta con un mensaje de error indicando que todos los campos son obligatorios.
            return
        }
        if(password !== repetirPassword){
            console.log("Los passwords no son iguales");
            setAlerta({msg: "Los passwords no son iguales", error: true, type: 'red'})
            return
        }
        if(password.length < 6){
            console.log("El password es muy corto, agrega mínimo 6 caracteres");
            setAlerta({msg: "El password es muy corto, agrega mínimo 6 caracteres", error: true, type: 'red'})
            return
        }  

        //si pasa las validaciones ya liiamos la alerta
        setAlerta({});
         console.log("Todo listo para enviar al backend...");  
        
        //crear el usuario en la api
        try {
            const {data} = await clienteAxios.post(`/veterinarios`, {nombre, email, password}) // Aquí se realiza una solicitud POST a la ruta "/veterinarios" del backend utilizando axios. Se envían los datos del nombre, email y password en el cuerpo de la solicitud para crear un nuevo usuario veterinario en la base de datos.
            console.log("Respuesta del backend:", data); // Imprime la respuesta del backend en la consola para verificar que se ha recibido correctamente.
            setAlerta({msg: data.msj, error: false, type: 'green'}) // Si la solicitud es exitosa, se establece una alerta con un mensaje de éxito utilizando el mensaje recibido del backend (data.msj) y se indica que no es un error (error: false) y se asigna un tipo de alerta verde (type: 'green').
        } catch (error) {
            console.error("Error al registrar el veterinario:", error); // Si ocurre un error durante la solicitud, se imprime un mensaje de error en la consola para ayudar a identificar el problema.
            setAlerta({msg: error.response.data.error, error: true, type: 'red'}) // Si ocurre un error durante la solicitud, se establece una alerta con un mensaje de error utilizando el mensaje recibido del backend (error.response.data.error) y se indica que es un error (error: true) y se asigna un tipo de alerta rojo (type: 'red').
        }
    }
    return (
        <>
            <h1 className="text-3xl font-bold text-blue-500">Crea tu cuenta</h1>
           <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}> {/* El evento onSubmit del formulario se maneja con la función handleSubmit, que se encarga de validar los datos ingresados por el usuario y mostrar las alertas correspondientes. */}
                {alerta.msg && <Alert alert={alerta}/>} {/* Aquí se renderiza el componente Alert, pasando la alerta actual como una prop. Esto permite mostrar mensajes de error o éxito al usuario durante el proceso de registro, dependiendo del estado de la alerta. */} 
                <div className="my-5">
                    <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                    <input onChange={e => setNombre(e.target.value)} id="nombre" type="text" placeholder="Tu Nombre" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
                </div>
                <div className="my-5">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
                </div>
                <div className="my-5">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
                </div>
                <div className="my-5">
                    <label htmlFor="repetir-password" className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                    <input onChange={e => setRepetirPassword(e.target.value)} id="repetir-password" type="password" placeholder="Repite tu Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"/>
                </div>
                <input type="submit"  value="Crear Cuenta" className="bg-blue-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-800 transition-colors"/>
            </form>
            <nav className="lg:flex lg:justify-between">
                 <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia sesión</Link>
                 <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvide mi password</Link>
              </nav>
        </>
    )
}

export default Registrar