import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const Bodega = sequelize.define("bodegas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
});



export default Bodega;