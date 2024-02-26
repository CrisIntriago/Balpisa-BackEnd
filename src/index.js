import app from "./app.js";
import usuarioRoutes from "../routes/usuarioRoutes.js";
import modeloRoutes from "../routes/modeloRoutes.js";
import familiaRoutes from "../routes/familiaRoutes.js";
import planchaRoutes from "../routes/planchaRoutes.js";
import movimientosRoutes from "../routes/movimientoRoutes.js";
import bodegasRoutes from "../routes/bodegaRoutes.js";
import { sequelize } from "../database/database.js";

async function main() {
    try {
        await sequelize.sync({alter : true});
        console.log("La conexión a la base de datos se ha ejecutado correctamente");
        app.listen(4000);
        console.log("Server is listening on", 4000)
    } catch (error) {
        console.log("No se pudo conectar a la base de datos")
    }
 
    app.use("/api/modelos", modeloRoutes);
    app.use("/api/planchas", planchaRoutes);
    app.use("/api/movimientos", movimientosRoutes);
    app.use("/api/bodegas", bodegasRoutes);
    app.use("/api/familias", familiaRoutes);
    app.use("/api/usuarios", usuarioRoutes);
}

main();