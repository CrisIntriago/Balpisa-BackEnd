import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const MovimientoUnitario = sequelize.define("movimientounitarios", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.ENUM,
        values: ["Ingreso", "Salida","Desperfecto", "CambioBodega"],
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
    valorRegistro: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true,
});



export default MovimientoUnitario;