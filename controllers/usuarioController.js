import Usuario from "../models/Usuario.js";
import { createHash } from 'crypto';
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
    // Evitar registros duplicados
    const { nombre, contrasena, token } = req.body;
    const existeUsuario = await Usuario.findOne({ where: { nombre } });

    if (existeUsuario) {
        const error = new Error("Ese nombre de usuario ya está registrado");
        return res.status(400).json({ msg: error.message });
    }

    const hash = createHash("sha1");
    hash.update(contrasena + process.env.CONTRASENA_ENCRIPTADORA);
    const contrasenaHasheada = hash.digest("hex");


    try {
        const nuevoUsuario = await Usuario.create({
            nombre,
            contrasena: contrasenaHasheada,
            token
        });
        res.json({ msg: "Se ha creado correctamente el Usuario." });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
};


const autenticar = async (req, res) => {
    // Evitar registros duplicados
    const { nombre, contrasena } = req.body;
    const existeUsuario = await Usuario.findOne({ where: { nombre } });


    if (!existeUsuario) {
        const error = new Error("No existe ese Usuario");
        return res.status(400).json({ msg: error.message });
    } else {
        const idUsuario = existeUsuario.id;
        const hash = createHash("sha1");
        hash.update(contrasena + process.env.CONTRASENA_ENCRIPTADORA);
        const contrasenaHasheada = hash.digest("hex");
        const constrasenaValidar = await Usuario.obtenerContrasenaPorId(idUsuario);

        if (constrasenaValidar === contrasenaHasheada) {
            res.json(
                {
                    token:generarJWT(idUsuario)
                });
        } else {
            res.status(500).json({ mensaje: 'No existe ese usuario' });
        }
    }
};


export {
    registrar,
    autenticar,
};