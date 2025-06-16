import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
dotenv.config();
app.use(express.json());
app.use(morgan('dev'));

// Middleware de seguridad: helmet para proteger encabezados HTTP
app.use(helmet());

// Lista blanca de orígenes permitidos
const whitelist = [process.env.FRONTEND_URL, "190.154.6.111", "159.203.190.84"];

// Configuración de CORS
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin) || !origin) {  // Permitir solicitudes sin origen (como Postman)
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Aplicar CORS a las solicitudes
app.use(cors(corsOptions));

export default app;
