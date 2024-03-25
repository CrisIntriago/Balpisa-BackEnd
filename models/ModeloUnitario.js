import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const ModeloUnitario = sequelize.define("modelounitarios", {
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
    codContable: {
        type: DataTypes.STRING,
    },
    m2PorUnidad: {
        type: DataTypes.DECIMAL(3,2),
    },
}, {
    timestamps: false,
});



export default ModeloUnitario;