import React  from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            {/* <h1> Administrar de Pacientes de Veterinario </h1> */}

            <main className="container mx-auto grid md:grid-cols-2 gap-10 mt-10 p-5 items-center"> 
                <Outlet /> {/* El Outlet es un componente de React Router que se utiliza para renderizar los componentes hijos dentro de un componente padre. 
                En este caso, el AuthLayout actúa como un contenedor para las páginas de autenticación (como Login y Register),
                y el Outlet se encargará de renderizar el contenido específico de cada una de esas páginas cuando se navegue a ellas. 
                Esto permite mantener una estructura de diseño consistente para todas las páginas de autenticación, mientras que el 
                contenido específico de cada página se renderiza dinámicamente dentro del mismo layout. */}
            </main>
        </>
    )
}

export default AuthLayout
