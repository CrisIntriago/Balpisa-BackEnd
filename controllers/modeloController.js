import { Modelo } from "../models/Relaciones.js";
import { Familia } from "../models/Relaciones.js"


const getModelosFromFamilia = async (req, res) => {
    try {
        const modelos = await Modelo.findAll();
        res.json(modelos);
    } catch (error) {
        console.error("Error querying modelos:", error);
        res.status(500).json({ error: "Error querying database" });
    }
}




// Create a new modelo
const addModelo = async (req, res) => {
    try {
        const { nombre, preciom2 } = req.body;
        const nuevoModelo = await Modelo.create({ nombre, preciom2 });
        res.status(201).json(nuevoModelo);
    } catch (error) {
        console.error("Error al crear el modelo:", error);
        res.status(500).json({ error: "Error al crear el modelo en la base de datos" });
    }
}

// Get all modelos
const findAll = async (req, res) => {
    try {
        const modelos = await Modelo.findAll();
        res.json(modelos);
    } catch (error) {
        console.error("Error al obtener los modelos:", error);
        res.status(500).json({ error: "Error al obtener los modelos de la base de datos" });
    }
}

// Update a modelo by ID
const updateModelo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, preciom2 } = req.body;
        const modelo = await Modelo.findByPk(id);
        if (!modelo) {
            return res.status(404).json({ error: "Modelo no encontrado" });
        }
        modelo.nombre = nombre;
        modelo.preciom2 = preciom2;
        await modelo.save();
        res.json(modelo);
    } catch (error) {
        console.error("Error al actualizar el modelo:", error);
        res.status(500).json({ error: "Error al actualizar el modelo en la base de datos" });
    }
}

// Delete a modelo by ID
const deleteModelo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedModelo = await Modelo.destroy({ where: { id } });
        if (!deletedModelo) {
            return res.status(404).json({ error: "Modelo no encontrado" });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar el modelo:", error);
        res.status(500).json({ error: "Error al eliminar el modelo de la base de datos" });
    }
}

export {
    addModelo,
    findAll,
    updateModelo,
    deleteModelo,
    getModelosFromFamilia,
};
