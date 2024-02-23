import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"


const Modelo = sequelize.define("Modelos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    preciom2: {
        type: DataTypes.DECIMAL(10, 2),
    },
    CodigoContable: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
});



export default Modelo;