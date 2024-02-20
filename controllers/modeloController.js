import { Modelo } from "../models/Relaciones.js";
import { sequelize } from "../database/database.js";
import Sequelize from "sequelize";

const getModelosFromFamilia = async (req, res) => {

    const { familiaId } = req.body;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT SUM(planchas.alto * planchas.ancho) AS m2Disponibles, modelos.nombre, modelos.preciom2
        FROM ((modelos
        JOIN planchas ON (modelos.id = planchas.ModeloId))
        JOIN familias ON (familias.id = modelos.FamiliaId))
        WHERE familias.id = :familiaId
        GROUP BY modelos.nombre, modelos.preciom2;
    `;

    sequelize.query(query, {
        replacements: { familiaId }, // Use replacements for parameterized query
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

const allPlanchas = async (req, res) => {

    // Suponiendo que tienes variables para ModeloId y BodegaId, por ejemplo:
    const { modeloId, bodegaId } = req.body;

    const query = `
    SELECT * FROM planchas WHERE ModeloId = :modeloId AND BodegaId = :bodegaId;
`;

    sequelize.query(query, {
        replacements: { modeloId, bodegaId }, // Utiliza reemplazos para la consulta parametrizada
        type: Sequelize.QueryTypes.SELECT // Especifica el tipo de consulta
    })
        .then(results => {
            // Envía los resultados como JSON
            res.status(200).json({ data: results });
        })
        .catch(error => {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al ejecutar la consulta' });
        });




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
    allPlanchas,
};
