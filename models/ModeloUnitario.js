import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const ModeloUnitario = sequelize.define("modeloUnitario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.DECIMAL(6,2),
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    codContable: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
});



export default ModeloUnitario;