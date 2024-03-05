import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";


const app = express();
dotenv.config();
app.use(express.json());
app.use(morgan('dev'));


const whitelist = [process.env.FRONTEND_URL , "190.154.6.111", "159.203.190.84"];

const corsOptions = {

    /*
    origin: function (origin, callback) {
        try {
            console.log('Origen:', origin); // Imprime el origen en la consola
            if (whitelist.includes(origin)) {
                // Puede consultar la API
                callback(null, true);
            } else {
                // No esta permitido
                throw new Error("Error de Cors");
            }
        } catch (error) {
            console.error('Error:', error.message); // Imprime el error en la consola
            callback(error);
        }
    }
    */
    origin:"*"
};

app.use(cors(corsOptions));


export default app;
