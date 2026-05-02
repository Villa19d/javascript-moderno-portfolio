import { Link } from "react-router-dom"
import {useState} from "react"
import Alert from "../components/Alerta"
import clienteAxios from "../config/axios.jsx"
import useAuth from "../hooks/useAuth.jsx"

const OlvidePassword = () => {
    const [alerta, setAlerta] = useState({})
    const  [email, setEmail] = useState("")

    const {auth} = useAuth()

    const handleSubmit = async e => {
        e.preventDefault()
        if(email === "" || email.length < 6){
            setAlerta({msg: "El email es obligatorio", error: true, type: 'red'})
            return
        }
        setAlerta({})
        try {
            const {data} = await clienteAxios.post("/veterinarios/olvide-password", {email})
            console.log("Respuesta del backend:", data);
            setAlerta({msg: data.msj, error: false, type: 'green'})
        } catch (error) {
            console.error("Error al solicitar el restablecimiento de contraseña:", error.response);
            setAlerta({msg: error.response.data.error, error: true, type: 'red'})
            console.log(alerta)
        }   
    }

    return (
        <>
           <div>
                <h1 className="text-3xl font-bold text-blue-500">Recupera tu acceso a APV</h1>
           </div>
           <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
              <form 
                   className="my-10 bg-white shadow rounded-lg p-10" 
                   onSubmit={handleSubmit} >
                     {alerta.msg && <Alert alert={alerta}/>}
                    <div className="my-5">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input 
                         id="email"
                         type="email" 
                         placeholder="Tu Email" 
                         className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                         value={email}
                         onChange={e => setEmail(e.target.value)}
                         />
                    </div>
                    <input type="submit" value="Enviar Instrucciones" className="bg-blue-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-800 transition-colors"/>
              </form>
           </div>
           <nav className="lg:flex lg:justify-between">
                 <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia sesión</Link>
                 <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Registrate</Link>
            </nav>
        </>
    )
}

export default OlvidePassword