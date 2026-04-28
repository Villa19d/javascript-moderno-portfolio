import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout.jsx"
import RutaProtegida from "./layout/RutaProtegida.jsx"

import AdministrarPacientes from "./pages/AdministrarPacientes.jsx"
import Login from "./pages/Login.jsx"
import Registrar from "./pages/Registrar.jsx"
import ConfirmarCuenta from "./pages/ConfirmarCuenta.jsx"
import OlvidePassword from "./pages/OlvidePassword.jsx"
import NuevoPassword from "./pages/NuevoPassword.jsx"
import EditarPerfil from "./pages/EditarPerfil.jsx"
import CambiarPassword from "./pages/CambiarPassword.jsx"

import { AuthProvider } from "./context/AuthProvider.jsx"
import { PacientesProvider } from "./context/PacientesProvider.jsx"

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path="registrar" element={<Registrar />} />
                        <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
                        <Route path="olvide-password" element={<OlvidePassword />} />
                        <Route path="olvide-password/:token" element={<NuevoPassword />} />
                    </Route>

                    <Route path="/admin" element={<RutaProtegida />}>
                        <Route
                            index
                            element={
                                <PacientesProvider>
                                    <AdministrarPacientes />
                                </PacientesProvider>
                            }
                        />
                        <Route path="perfil" element={<EditarPerfil />} />
                        <Route path="cambiar-password" element={<CambiarPassword />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App