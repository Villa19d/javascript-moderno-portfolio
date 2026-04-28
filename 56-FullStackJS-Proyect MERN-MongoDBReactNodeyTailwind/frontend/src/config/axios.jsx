import axios from "axios";

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL // Aquí se establece la URL base para las solicitudes HTTP utilizando una variable de entorno. Esto permite que la aplicación pueda cambiar fácilmente entre diferentes entornos (desarrollo, producción, etc.) sin necesidad de modificar el código fuente.
})

export default clienteAxios; // Exportamos el cliente de Axios para que pueda ser utilizado en otras partes de la aplicación para realizar solicitudes HTTP al backend.