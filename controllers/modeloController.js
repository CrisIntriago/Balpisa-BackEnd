import {Modelo} from "../models/Relaciones.js";


const findAll = async (req, res) => {

    try {
        // Obtener todas las instancias del modelo
        const instances = await Modelo.findAll();

        // Enviar las instancias como respuesta JSON
        res.json(instances);
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error("Error al obtener las instancias:", error);
        res.status(500).json({ error: "Error al obtener las instancias de la base de datos" });
    }

}


export {
    findAll
}