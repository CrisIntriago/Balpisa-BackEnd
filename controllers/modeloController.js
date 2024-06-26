import { Modelo } from "../models/Relaciones.js";
import { sequelize } from "../database/database.js";
import Sequelize, { QueryTypes } from "sequelize";

const getModelosFromFamilia = async (req, res) => {

    const { familiaId } = req.body;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT  modelos.id, modelos.nombre 
        FROM modelos
        WHERE modelos.FamiliaId = :familiaId;
    
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

const getModelosM2FromFamilia = async (req, res) => {
    const { familiaId, modeloId } = req.body;

    // Base query
    let query = `
        SELECT modelos.id, modelos.nombre, SUM(planchas.alto * planchas.ancho) AS m2Disponibles, modelos.preciom2
        FROM modelos
        JOIN planchas ON modelos.id = planchas.ModeloId
        JOIN familias ON familias.id = modelos.FamiliaId
        WHERE familias.id = :familiaId
    `;

    // Check if modeloId is provided
    if (modeloId) {
        query += ' AND modelos.id = :modeloId';
    }

    query += ' GROUP BY modelos.id;';

    try {
        const replacements = { familiaId };
        if (modeloId) {
            replacements.modeloId = modeloId;
        }

        const results = await sequelize.query(query, {
            replacements: replacements, // Use replacements for parameterized query
            type: QueryTypes.SELECT // Specify the query type
        });

        // Send results as JSON
        res.status(200).json({ data: results });
    } catch (error) {
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Error executing raw query' });
    }
};



const allPlanchas = async (req, res) => {
    const { modeloId, bodegaId } = req.query;

    const query = `
    SELECT id , nombre,alto,ancho,despunte1A,despunte1B,despunte2A, despunte2B, despunte3A, despunte3B, estado FROM planchas WHERE modeloId = :modeloId AND bodegaId = :bodegaId;
`;

    sequelize.query(query, {
        replacements: { modeloId, bodegaId },
        type: Sequelize.QueryTypes.SELECT
    })
        .then(results => {
            res.status(200).json({ data: results });
        })
        .catch(error => {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al ejecutar la consulta' });
        });
};

// Create a new modelo
const addModelo = async (req, res) => {
    try {
        const { nombre, preciom2, CodigoContable, familiaId } = req.body;
        const nuevoModelo = await Modelo.create({ nombre, preciom2, CodigoContable, familiaId });
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
        const { nombre, preciom2, CodigoContable } = req.body;
        const modelo = await Modelo.findByPk(id);
        if (!modelo) {
            return res.status(404).json({ error: "Modelo no encontrado" });
        }
        modelo.nombre = nombre;
        modelo.preciom2 = preciom2;
        modelo.CodigoContable = CodigoContable;
        await modelo.save();
        res.json(modelo);
    } catch (error) {
        console.error("Error al actualizar el modelo:", error);
        res.status(500).json({ error: "Error al actualizar el modelo en la base de datos" });
    }
}

// Update a modelo by ID
const getModelo = async (req, res) => {
    try {
        const { id } = req.params;
        const modelo = await Modelo.findByPk(id);
        if (modelo) {
            // Define manualmente el objeto que deseas enviar,
            // seleccionando solo las columnas específicas que quieras incluir
            const respuesta = {
                nombre: modelo.nombre,
                CodigoContable: modelo.CodigoContable,
                preciom2: modelo.preciom2
                // Añade aquí las demás columnas que quieras incluir
            };

            res.json(respuesta);
        } else {
            res.status(404).send('Modelo no encontrado');
        }
    }catch(error){
        console.log(error);
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
    getModelosM2FromFamilia,
    allPlanchas,
    getModelosFromFamilia,
    getModelo
};
