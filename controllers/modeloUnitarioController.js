import { ModeloUnitario } from "../models/Relaciones.js";
import { sequelize } from "../database/database.js";
import Sequelize from "sequelize";


const getModeloUnitarioById = async (req, res) => {

    const { id } = req.params;

    // Parameterized query to prevent SQL injection
    const query = `
    SELECT id, nombre, precio, m2PorUnidad FROM modelounitarios WHERE id = :id;
    `;

    sequelize.query(query, {
        replacements: { id }, // Use replacements for parameterized query
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



const getModelosFromFamilia = async (req, res) => {

    const { familiaId } = req.body;

    // Parameterized query to prevent SQL injection
    const query = `
       SELECT id, nombre 
       FROM modelounitarios WHERE
       familiaId= :familiaId;
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

    const { familiaId } = req.body;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT mu.id, mu.nombre, mu.cantidad as unidades, mu.m2PorUnidad * mu.cantidad as m2Disponibles, mu.precio as "preciom2" 
        FROM modelounitarios as mu 
        JOIN familias ON (mu.familiaId = familias.id)
        WHERE familias.id =:familiaId;
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

};


const incrementarCantidad = async (req, res) => {
    const { id, cantidad } = req.params;

    try {
        // Intenta incrementar el campo numérico
        await ModeloUnitario.increment(
            { 'cantidad': cantidad }, // Asegúrate de reemplazar 'tuCampoNumerico' con el nombre real del campo
            { where: { id: id } }
        );

        res.status(200).send({ message: "Cantidad aumentada exitosamente" });

    } catch (error) {
        // Maneja cualquier error que ocurra durante la operación
        res.status(500).send({ message: "Ocurrió un error al aumentar la cantidad", error: error.message });
    }
};


const decrementarCantidad = async (req, res) => {
    const { id, cantidad } = req.params;

    try {
        // Intenta decrementar el campo numérico
        await ModeloUnitario.decrement(
            { 'cantidad': cantidad }, // Asegúrate de reemplazar 'tuCampoNumerico' con el nombre real del campo
            { where: { id: id } }
        );

        res.status(200).send({ message: "Cantidad decrementada exitosamente" });

    } catch (error) {
        // Maneja cualquier error que ocurra durante la operación
        res.status(500).send({ message: "Ocurrió un error al decrementar la cantidad", error: error.message });
    }
};


// FALTA MODIFICAR TODO ESTOOOOO:



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
    getModelosM2FromFamilia,
    getModelosFromFamilia,
    incrementarCantidad,
    decrementarCantidad,
    getModeloUnitarioById
};
