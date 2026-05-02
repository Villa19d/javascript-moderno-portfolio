import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth.jsx"

const Header = () => {
    const { auth, cerrarSesion } = useAuth()

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">
                    Administrador de Pacientes{" "}
                    <span className="text-white font-black">Veterinaria</span>
                </h1>
                <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
                    <Link
                        to="/admin"
                        className="text-white text-sm font-bold uppercase hover:text-indigo-200 transition-colors"
                    >
                        Pacientes
                    </Link>
                    <Link
                        to="/admin/perfil"
                        className="text-white text-sm font-bold uppercase hover:text-indigo-200 transition-colors"
                    >
                        Perfil
                    </Link>
                    <p className="text-indigo-200 text-sm font-bold uppercase">
                        {auth?.nombre}
                    </p>
                    <button
                        type="button"
                        className="text-white text-sm font-bold uppercase border border-white rounded px-4 py-1 hover:bg-indigo-700 transition-colors"
                        onClick={cerrarSesion}
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header