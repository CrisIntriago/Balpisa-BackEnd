import { Movimiento } from "../models/Relaciones.js";
import { sequelize } from "../database/database.js";
import { Sequelize } from "sequelize";
// Create a new movimiento
const addMovimiento = async (req, res) => {
    try {
        const { valorRegistro, planchaId, nFactura, precioVenta, tipo } = req.body;
        const nuevoMovimiento = await Movimiento.create({ valorRegistro, planchaId, nFactura, precioVenta, tipo });
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
const movimientosEnFecha = async (req, res) => {
    const { fechaInicio, fechaFin , offset} = req.body;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT mov.tipo, b.nombre, f.nombre, mo.nombre, mo.CodigoContable, mov.valorRegistro, p.nombre, mov.nFactura FROM movimientos as mov 
        JOIN planchas as p ON (mov.planchaId = p.id)
        JOIN modelos as mo ON (mo.id = p.modeloId)
        JOIN familias as f ON( mo.familiaId = f.id)
        JOIN bodegas as b ON (b.id = p.bodegaId)
        WHERE mov.createdAt BETWEEN :fechaInicio AND :fechaFin
        LIMIT 25 OFFSET :offset;
    `;

    sequelize.query(query, {
        replacements: { fechaInicio: fechaInicio + ' 00:00:00', fechaFin: fechaFin + ' 23:59:59' , offset}, // Use replacements for parameterized query
        type: Sequelize.QueryTypes.SELECT // Specify the query type
    })
        .then(results => {
            // Send results as JSON
            res.status(201).json({ data: results });
        })
        .catch(error => {
            console.error('Error executing raw query:', error);
            res.status(500).json({ error: 'Error executing raw query' });
        });
}

export {
    addMovimiento,
    findAllMovimientos,
    updateMovimiento,
    deleteMovimiento,
    movimientosEnFecha,
};
