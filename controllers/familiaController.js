import { Familia } from "../models/Relaciones.js";

// Create a new familia
const addFamilia = async (req, res) => {
    try {
        const { nombre } = req.body;
        // Create a new instance of the Familia model
        const nuevaFamilia = await Familia.create({ nombre });
        res.status(201).json(nuevaFamilia);
    } catch (error) {
        console.error("Error al crear la familia:", error);
        res.status(500).json({ error: "Error al crear la familia en la base de datos" });
    }
}

// Get all familias
const findAll = async (req, res) => {
    console.log("Este endpoint está siendo llamado");
    try {
        // Retrieve all instances of the Familia model
        const familias = await Familia.findAll();
        res.json(familias);
    } catch (error) {
        console.error("Error al obtener las familias:", error);
        res.status(500).json({ error: "Error al obtener las familias de la base de datos" });
    }
}

// Update a familia by ID
const updateFamilia = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        // Find the familia by ID
        const familia = await Familia.findByPk(id);
        if (!familia) {
            return res.status(404).json({ error: "Familia no encontrada" });
        }
        // Update the familia's nombre
        familia.nombre = nombre;
        await familia.save();
        res.json(familia);
    } catch (error) {
        console.error("Error al actualizar la familia:", error);
        res.status(500).json({ error: "Error al actualizar la familia en la base de datos" });
    }
}

// Delete a familia by ID
const deleteFamilia = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the familia by ID and delete it
        const deletedFamilia = await Familia.destroy({ where: { id } });
        if (!deletedFamilia) {
            return res.status(404).json({ error: "Familia no encontrada" });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar la familia:", error);
        res.status(500).json({ error: "Error al eliminar la familia de la base de datos" });
    }
}

export {
    addFamilia,
    findAll,
    updateFamilia,
    deleteFamilia
};
