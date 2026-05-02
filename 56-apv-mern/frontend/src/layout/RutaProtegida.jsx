import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth.jsx"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

const RutaProtegida = () => {
    const { auth, cargando } = useAuth()
    console.log("Desde ruta protegida auth dice:",auth)
    console.log(cargando)

    if(cargando) return "Cargando..." /* Si el estado de cargando es verdadero, se muestra un mensaje de "Cargando..." en lugar de renderizar el contenido de la ruta protegida. Esto es útil para evitar mostrar contenido mientras se está verificando la autenticación del usuario. */

    return (
        <>  
            {auth?._id ? (
                <div className="bg-gray-100 min-h-screen">
                    <Header />
                    <div className="container mx-auto mt-12">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </>
    )
}

export default RutaProtegida