import { MovimientoUnitario } from '../models/Relaciones.js'; // Ajusta la ruta según sea necesario
import { CantidadEnBodega } from "../models/Relaciones.js";

import { sequelize } from '../database/database.js';
import { Sequelize } from 'sequelize';

const nFilas = async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT COUNT(*) as total
        FROM movimientounitarios AS movu
        JOIN modelounitarios AS modu ON (movu.modeloUnitarioId = modu.id)
        WHERE movu.createdAt BETWEEN :fechaInicio AND :fechaFin
    `;

    sequelize.query(query, {
        replacements: { fechaInicio: fechaInicio + ' 00:00:00', fechaFin: fechaFin + ' 23:59:59' }, // Use replacements for parameterized query
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

const addMovimiento = async (req, res) => {
    try {
        const { tipo, cantidadCambiada, nFactura, precioVenta, modelounitarioId, valorRegistro } = req.body;
        const movimiento = await MovimientoUnitario.create({ tipo, cantidadCambiada, nFactura, precioVenta, modelounitarioId, valorRegistro });
        res.status(201).send(movimiento);
    } catch (error) {
        res.status(500).send({ message: "Error al crear el movimiento", error: error.message });
    }
};

const findAllMovimientos = async (req, res) => {
    try {
        const movimientos = await MovimientoUnitario.findAll();
        res.status(200).send(movimientos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los movimientos", error: error.message });
    }
};

const movimientosEnFecha = async (req, res) => {
    const { fechaInicio, fechaFin, offset } = req.body;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT movu.id, movu.tipo, modu.nombre, modu.codContable, movu.cantidadCambiada, movu.valorRegistro, movu.nFactura
        FROM movimientounitarios AS movu
        JOIN modelounitarios AS modu ON (movu.modeloUnitarioId = modu.id)
        WHERE movu.createdAt BETWEEN :fechaInicio AND :fechaFin
        LIMIT 5 OFFSET :offset;
    `;

    sequelize.query(query, {
        replacements: { fechaInicio: fechaInicio + ' 00:00:00', fechaFin: fechaFin + ' 23:59:59', offset }, // Use replacements for parameterized query
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
    movimientosEnFecha,
    nFilas
};
