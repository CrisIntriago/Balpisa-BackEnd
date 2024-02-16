import Usuario from "../models/Usuario.js";
import { createHash } from 'crypto';
import generarJWT from "../helpers/generarJWT.js";


//Registra al usuario
const registrar = async (req, res) => {
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

//Confirma que la contraseña y usuario están correctos
const autenticar = async (req, res) => {
    const { nombre, contrasena } = req.body;
    const existeUsuario = await Usuario.findOne({ where: { nombre } });


    if (!existeUsuario) {
        const error = new Error("No existe ese Usuario o la contraseña está mal.");
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
                    id: idUsuario,
                    nombre: existeUsuario.nombre,
                    token: generarJWT(idUsuario)
                });
        } else {
            res.status(500).json({ mensaje: 'No existe ese usuario' });
        }
    }
};

const perfil = async (req, res) => {

    res.json(req.usuario);

}

export {
    registrar,
    autenticar,
    perfil,
};