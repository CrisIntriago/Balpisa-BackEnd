import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const Movimiento = sequelize.define("Movimientos", {
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
}, {
    timestamps: false,
});

export default Movimiento;