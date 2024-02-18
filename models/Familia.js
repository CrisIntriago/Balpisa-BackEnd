import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

const Familia = sequelize.define("Familias", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});


export default Familia;