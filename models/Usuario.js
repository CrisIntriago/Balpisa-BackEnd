import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"


const Usuario = sequelize.define("usuarios", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    contrasena:{
        type: DataTypes.STRING,
    },
}, {
    timestamps:false,
});

Usuario.obtenerContrasenaPorId = async function(idUsuario) {
    try {
        const usuario = await this.findByPk(idUsuario);
        if (!usuario) {
            throw new Error('No se encontró ningún usuario con la ID proporcionada');
        }
        return usuario.contrasena;
    } catch (error) {
        console.error('Error al obtener la contraseña del usuario:', error);
        throw error;
    }
};

export default Usuario;