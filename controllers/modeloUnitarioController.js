import { ModeloUnitario } from "../models/Relaciones.js";
import { sequelize } from "../database/database.js";
import Sequelize from "sequelize";
import { CantidadEnBodega } from "../models/Relaciones.js";



const getModeloUnitarioById = async (req, res) => {

    const { id } = req.params;

    // Parameterized query to prevent SQL injection
    const query = `
    SELECT id, codContable, nombre, precio, m2PorUnidad FROM modelounitarios WHERE id = :id;
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
    const { familiaId, modeloId } = req.body;

    // Base query
    let query = `
        SELECT modelounitarios.id, modelounitarios.nombre, SUM(cantidad) AS unidades, 
               SUM(cantidad) * modelounitarios.m2PorUnidad AS m2Disponibles, 
               modelounitarios.precio AS preciom2 
        FROM cantidadenbodegas 
        JOIN modelounitarios ON (modelounitarios.id = cantidadenbodegas.modelounitarioId) 
        JOIN bodegas ON (bodegas.id = cantidadenbodegas.bodegaId) 
        JOIN familias ON (familias.id = modelounitarios.familiaId)
        WHERE familias.id = :familiaId
    `;

    // Add additional condition if modeloId is provided
    if (modeloId) {
        query += ` AND modelounitarios.id = :modeloId`;
    }

    query += ` GROUP BY modelounitarios.id;`;

    // Prepare replacements object
    const replacements = { familiaId };
    if (modeloId) {
        replacements.modeloId = modeloId;
    }

    try {
        const results = await sequelize.query(query, {
            replacements: replacements, // Use replacements for parameterized query
            type: Sequelize.QueryTypes.SELECT // Specify the query type
        });

        // Send results as JSON
        res.status(201).json({ data: results });
    } catch (error) {
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Error executing raw query' });
    }
};


const getCantidadXBodega = async (req, res) => {
    const { modeloId } = req.params;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT cantidad , bodegas.nombre  FROM cantidadenbodegas JOIN modelounitarios ON (modelounitarios.id = cantidadenbodegas.modelounitarioId) JOIN bodegas ON (bodegas.id = cantidadenbodegas.bodegaId)
        WHERE modelounitarios.id = :modeloId;
    `;

    sequelize.query(query, {
        replacements: { modeloId }, // Use replacements for parameterized query
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



const getCantidadEnBodega = async (req, res) => {
    const { modeloId , bodegaId} = req.params;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT cantidad , bodegas.nombre  FROM cantidadenbodegas JOIN modelounitarios ON (modelounitarios.id = cantidadenbodegas.modelounitarioId) JOIN bodegas ON (bodegas.id = cantidadenbodegas.bodegaId)
        WHERE modelounitarios.id = :modeloId and bodegaId= :bodegaId;
    `;

    sequelize.query(query, {
        replacements: { modeloId , bodegaId}, // Use replacements for parameterized query
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





const incrementarCantidad = async (req, res) => {

    const { modeloId, bodegaId, cantidad } = req.params;

    try {
        // Utiliza await para esperar la promesa de findOrCreate
        const [resultado, creado] = await CantidadEnBodega.findOrCreate({
            where:
            {
                modelounitarioId: modeloId,
                bodegaId: bodegaId
            },
            defaults: {
                // valores por defecto para la creación
                modelounitarioId: modeloId,
                bodegaId: bodegaId
                // otros valores por defecto según sea necesario
            }
        });

        if (creado) {
            console.log('Creado', resultado.get({ plain: true }));
            resultado.cantidad = parseInt(cantidad);
            //Puedo manipular a creado !
        } else {
            console.log('Encontrado', resultado.get({ plain: true }));
            resultado.cantidad += parseInt(cantidad);
        }
        await resultado.save();
        res.status(200).send({ message: "Cantidad aumentada exitosamente" });


    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: "Ocurrió un error al intentar crear o encontrar la cantidad para Modelos Unitarios, en modeloUnitarioController.jsx", error: error.message });
    }

};


const decrementarCantidad = async (req, res) => {
    const { modeloId, bodegaId, cantidad } = req.params;

    try {
        // Utiliza await para esperar la promesa de findOrCreate
        const [resultado, creado] = await CantidadEnBodega.findOrCreate({
            where:
            {
                modelounitarioId: modeloId,
                bodegaId: bodegaId
            },
            defaults: {
                // valores por defecto para la creación
                modelounitarioId: modeloId,
                bodegaId: bodegaId
                // otros valores por defecto según sea necesario
            }
        });

        if (creado) {
            console.log('Creado', resultado.get({ plain: true }));
            resultado.cantidad = parseInt( - cantidad);
            //Puedo manipular a creado !
        } else {
            console.log('Encontrado', resultado.get({ plain: true }));
            resultado.cantidad -= parseInt(cantidad);
        }
        await resultado.save();
        res.status(200).send({ message: "Cantidad aumentada exitosamente" });


    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: "Ocurrió un error al intentar crear o encontrar la cantidad para Modelos Unitarios, en modeloUnitarioController.jsx", error: error.message });
    }
};










// FALTA MODIFICAR TODO ESTOOOOO:



// Create a new modelo
const addModelo = async (req, res) => {
    try {
        const { nombre, codContable, m2PorUnidad, precio, familiaId } = req.body;
        const cantidad = 0;
        const nuevoModelo = await ModeloUnitario.create({ nombre, codContable, m2PorUnidad, precio, familiaId, cantidad });
        res.status(201).json(nuevoModelo);
    } catch (error) {
        console.error("Error al crear el modelo:", error);
        res.status(500).json({ error: "Error al crear el modelo en la base de datos" });
    }
}

// Get all modelos
const findAll = async (req, res) => {
    try {
        const modelos = await ModeloUnitario.findAll();
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
        const { nombre, codContable, m2PorUnidad, precio } = req.body;
        const modelo = await ModeloUnitario.findByPk(id);
        if (!modelo) {
            return res.status(404).json({ error: "Modelo no encontrado" });
        }
        modelo.nombre = nombre;
        modelo.codContable = codContable;
        modelo.m2PorUnidad = m2PorUnidad;
        modelo.precio = precio;
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
        const deletedModelo = await ModeloUnitario.destroy({ where: { id } });
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
    getModeloUnitarioById,
    addModelo,
    updateModelo,
    getCantidadXBodega,
    getCantidadEnBodega
};
