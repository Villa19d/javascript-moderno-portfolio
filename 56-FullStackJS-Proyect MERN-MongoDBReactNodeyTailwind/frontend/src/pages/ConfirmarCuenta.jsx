 
 import { useParams } from "react-router-dom"
 import axios from "axios"
 import { useState, useEffect,useRef } from "react";
 import Alerta from "../components/Alerta";
 import clienteAxios from "../config/axios.jsx";
 
 
 const ConfirmarCuenta = () => {

        const params = useParams();
        console.log(params); //devolvera un objeto con el token que se encuentra en la URL
        const { token } = params; //desestructuramos el token del objeto params
        
        const [alerta, setAlerta] = useState({});
        const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
        const autenticando = useRef(false);
        
    useEffect(() => {
        const confirmarCuenta = async () => {
            // Evitamos doble ejecución
            if (autenticando.current) return;
            autenticando.current = true;

            try {
                const url = `${clienteAxios.defaults.baseURL}/veterinarios/confirmar/${token}`; // Construimos la URL para confirmar la cuenta utilizando la variable de entorno VITE_REACT_APP_BACKEND_URL y el token extraído de los parámetros de la URL.
                const { data } = await clienteAxios.get(url); // Realizamos una solicitud GET a la URL construida para confirmar la cuenta y almacenamos la respuesta en la variable data.
                console.log("Respuesta desde el backend",data); // Imprimimos la respuesta en la consola para verificar que la cuenta se ha confirmado correctamente.
                setAlerta({
                    msg: data.msg || "Cuenta confirmada correctamente", 
                    error: false, 
                    type: 'blue'
                });
                setCuentaConfirmada(true);
            } catch (error) {
                setAlerta({
                    msg: error.response?.data?.msg || "Token no válido", 
                    error: true, 
                    type: 'red'
                });
                console.error("Error al confirmar la cuenta:", error); // Si ocurre un error durante el proceso de confirmación, lo imprimimos en la consola para su depuración.
            }
        } 
        confirmarCuenta(); // Llamamos a la función confirmarCuenta para iniciar el proceso de confirmación de la cuenta usando recursividad

    }, [token]); // El efecto se ejecutará cada vez que el token cambie, lo que permite confirmar la cuenta correctamente incluso si el token se actualiza en la URL.
    
       

    return (
        <>

        <h1 className="text-3xl font-bold text-blue-500 mb-10">Confirmación de cuenta</h1>
            
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {/* 4. Renderizado de la alerta */}
                {alerta.msg && <Alerta alert={alerta} />}

                {cuentaConfirmada && (
                    <a href="/" className="block text-center my-5 text-gray-500 uppercase text-sm">
                        Inicia Sesión
                    </a>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta