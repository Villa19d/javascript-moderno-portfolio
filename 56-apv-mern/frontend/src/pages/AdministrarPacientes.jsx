import FormularioPaciente from "../components/FormularioPaciente.jsx"
import ListadoPacientes from "../components/ListadoPacientes.jsx"

const AdministrarPacientes = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <FormularioPaciente />
            <ListadoPacientes />
        </div>
    )
}

export default AdministrarPacientes