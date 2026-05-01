import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import cors from "cors";

// 1. Configurar dotenv ANTES que cualquier otra cosa
dotenv.config();

const app = express();

// 2. Conectar a la DB
connectDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir peticiones sin origen (como Postman o Server-to-Server pings) 
        // O si el origen está en nuestra lista blanca
        if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Acceso a la API no permitido desde ese dominio por Cors"), false);
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());

// Tus rutas
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});