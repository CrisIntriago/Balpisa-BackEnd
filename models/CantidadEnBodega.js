import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"


const CantidadEnBodega = sequelize.define('cantidadenbodegas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: DataTypes.INTEGER
}, {
    timestamps: false,
});


export default CantidadEnBodega;