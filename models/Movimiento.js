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
        values: ["Ingreso", "Salida", "CambioBodega"], // Replace 'value1', 'value2', 'value3' with your enum values
    },
    precioVenta: {
        type: DataTypes.DECIMAL(7, 5),
    },
    despunte1A: {
        type: DataTypes.DECIMAL(3, 2),
    },
    despunte1B: {
        type: DataTypes.DECIMAL(3, 2),
    },
    despunte2A: {
        type: DataTypes.DECIMAL(3, 2),
    },
    despunte2B: {
        type: DataTypes.DECIMAL(3, 2),
    },
    despunte3A: {
        type: DataTypes.DECIMAL(3, 2),
    },
    despunte3B: {
        type: DataTypes.DECIMAL(3, 2),
    },
}, {
    timestamps: true,
});

export default Movimiento;