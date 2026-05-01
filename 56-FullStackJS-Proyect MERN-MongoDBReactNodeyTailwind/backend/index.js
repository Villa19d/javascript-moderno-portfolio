import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import cors from "cors";

console.log("ENV TEST:", process.env.MONGO_URI);

dotenv.config();

const app = express();
connectDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]; // Aquí se define un array con los dominios permitidos para realizar solicitudes a la API. En este caso, se obtiene el valor del dominio permitido desde una variable de entorno llamada FRONTEND_URL.

const corsOptions = {
    origin: function (origin, callback) { // La función origin se utiliza para verificar si el origen de la solicitud está incluido en el array de dominios permitidos. Si el origen está permitido, se llama al callback con null y true para permitir la solicitud. Si el origen no está permitido, se llama al callback con un error indicando que el acceso a la API no está permitido desde ese dominio.
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Acceso a la API no permitido desde ese dominio por Cors"), false);
        }
    }
};

app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});