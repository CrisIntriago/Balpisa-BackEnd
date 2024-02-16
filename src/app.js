import express from "express";
import dotenv from "dotenv";
import cors from "cors";



const app = express();
dotenv.config();
app.use(express.json());

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            // Puede consultar la API
            callback(null, true);
        } else {
            // No esta permitido
            callback(new Error("Error de Cors"));
        }
    },
};

app.use(cors(corsOptions));


export default app;
