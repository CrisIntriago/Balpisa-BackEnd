import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const MovimientoUnitario = sequelize.define("movimientoUnitario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.ENUM,
        values: ["Ingreso", "Salida","Desperfecto"],
    },
    cantidadCambiada: {
        type: DataTypes.INTEGER,
    },
    nFactura: {
        type: DataTypes.STRING,
    },
    precioVenta: {
        type: DataTypes.DECIMAL(7, 2),
    },
}, {
    timestamps: true,
});



export default MovimientoUnitario;