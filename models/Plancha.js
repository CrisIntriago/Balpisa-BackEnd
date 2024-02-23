import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"


const Plancha = sequelize.define("planchas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    alto: {
        type: DataTypes.DECIMAL(3, 2),
    },
    ancho: {
        type: DataTypes.DECIMAL(3, 2),
    },
    despunte1A: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.00,
    },
    despunte1B: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.00,
    },
    despunte2A: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.00,
    },
    despunte2B: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.00,
    },
    despunte3A: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.00,
    },
    despunte3B: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.00,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: false,
});



export default Plancha;