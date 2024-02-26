import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const Movimiento = sequelize.define("movimientos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    nFactura: {
        type: DataTypes.STRING,
    },
    tipo: {
        type: DataTypes.ENUM,
        values: ["Ingreso", "Salida", "CambioBodega","Desperfecto"], // Replace 'value1', 'value2', 'value3' with your enum values
    },
    precioVenta: {
        type: DataTypes.DECIMAL(7, 5),
    },
    valorRegistro: {
        type: DataTypes.STRING,
    }
    
}, {
    timestamps: true,
});

export default Movimiento;