import {Bodega} from "../models/Relaciones.js";

// Create a new bodega
const addBodega = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevaBodega = await Bodega.create({ nombre });
        res.status(201).json(nuevaBodega);
    } catch (error) {
        console.error("Error al crear la bodega:", error);
        res.status(500).json({ error: "Error al crear la bodega en la base de datos" });
    }
}

// Get all bodegas
const findAllBodegas = async (req, res) => {
    try {
        const bodegas = await Bodega.findAll();
        res.json(bodegas);
    } catch (error) {
        console.error("Error al obtener las bodegas:", error);
        res.status(500).json({ error: "Error al obtener las bodegas de la base de datos" });
    }
}

// Update a bodega by ID
const updateBodega = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const bodega = await Bodega.findByPk(id);
        if (!bodega) {
            return res.status(404).json({ error: "Bodega no encontrada" });
        }
        bodega.nombre = nombre;
        await bodega.save();
        res.json(bodega);
    } catch (error) {
        console.error("Error al actualizar la bodega:", error);
        res.status(500).json({ error: "Error al actualizar la bodega en la base de datos" });
    }
}

// Delete a bodega by ID
const deleteBodega = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBodega = await Bodega.destroy({ where: { id } });
        if (!deletedBodega) {
            return res.status(404).json({ error: "Bodega no encontrada" });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar la bodega:", error);
        res.status(500).json({ error: "Error al eliminar la bodega de la base de datos" });
    }
}

export {
    addBodega,
    findAllBodegas,
    updateBodega,
    deleteBodega
};
