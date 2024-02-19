import {Movimiento} from "../models/Relaciones.js";

// Create a new movimiento
const addMovimiento = async (req, res) => {
    try {
        const { nombre, nFactura } = req.body;
        const nuevoMovimiento = await Movimiento.create({ nombre, nFactura });
        res.status(201).json(nuevoMovimiento);
    } catch (error) {
        console.error("Error al crear el movimiento:", error);
        res.status(500).json({ error: "Error al crear el movimiento en la base de datos" });
    }
}

// Get all movimientos
const findAllMovimientos = async (req, res) => {
    try {
        const movimientos = await Movimiento.findAll();
        res.json(movimientos);
    } catch (error) {
        console.error("Error al obtener los movimientos:", error);
        res.status(500).json({ error: "Error al obtener los movimientos de la base de datos" });
    }
}

// Update a movimiento by ID
const updateMovimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, nFactura } = req.body;
        const movimiento = await Movimiento.findByPk(id);
        if (!movimiento) {
            return res.status(404).json({ error: "Movimiento no encontrado" });
        }
        movimiento.nombre = nombre;
        movimiento.nFactura = nFactura;
        await movimiento.save();
        res.json(movimiento);
    } catch (error) {
        console.error("Error al actualizar el movimiento:", error);
        res.status(500).json({ error: "Error al actualizar el movimiento en la base de datos" });
    }
}

// Delete a movimiento by ID
const deleteMovimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovimiento = await Movimiento.destroy({ where: { id } });
        if (!deletedMovimiento) {
            return res.status(404).json({ error: "Movimiento no encontrado" });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar el movimiento:", error);
        res.status(500).json({ error: "Error al eliminar el movimiento de la base de datos" });
    }
}

export {
    addMovimiento,
    findAllMovimientos,
    updateMovimiento,
    deleteMovimiento
};
