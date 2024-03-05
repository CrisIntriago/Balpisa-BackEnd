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

    
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            // Puede consultar la API
            callback(null, true);
        } else {
            // No esta permitido
            callback(new Error("Error de Cors"));
        }
    },
    

    //origin:"*"
};

app.use(cors(corsOptions));


export default app;
