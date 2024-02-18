import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"


const Plancha = sequelize.define("Planchas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    alto: {
        type: DataTypes.DECIMAL(10, 2),
    },
    ancho: {
        type: DataTypes.DECIMAL(10, 2),
    },
}, {
    timestamps: false,
});



export default Plancha;