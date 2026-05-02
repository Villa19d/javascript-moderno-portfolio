import { useContext } from "react"
import PacientesContext from "../context/PacientesProvider.jsx"

const usePacientes = () => {
    return useContext(PacientesContext)
}

export default usePacientes