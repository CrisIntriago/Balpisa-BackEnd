import app from "./app.js";
import { sequelize } from "../database/database.js";
import "../models/Usuario.js";

async function main() {
    try {
        await sequelize.sync({alter:true});
        console.log("La conexión a la base de datos se ha ejecutado correctamente");
        app.listen(4000);
        console.log("Server is listening on", 4000)
    }catch(error){
        console.log("No se pudo conectar a la base de datos")
    }

}

main();