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

const corsOptions = {
    origin: function (origin, callback) {
        const dominiosPermitidos = [
            process.env.FRONTEND_URL
        ];

        // Limpia comillas, espacios y barras diagonales finales para evitar cualquier error de sintaxis en Render
        const cleanDominio = (url) => url?.replace(/['"]/g, '').replace(/\/$/, '').trim();

        // Verifica que el origen actual esté en los dominios permitidos
        if (!origin || dominiosPermitidos.some(dominio => cleanDominio(dominio) === cleanDominio(origin))) {
            callback(null, true);
        } else {
            console.error(`⚠️ Origen bloqueado por CORS: ${origin}`);
            callback(new Error("Acceso a la API no permitido desde ese dominio por Cors"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Habilita el envío de cookies o headers de autorización si los usas
    optionsSuccessStatus: 200 // Algunos navegadores legacy (IE11, varios SmartTVs) se bloquean con 204
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

// Exportar la app para Vercel Serverless Functions
export default app;