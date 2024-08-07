import { Plancha } from "../models/Relaciones.js";
import { sequelize } from "../database/database.js";
import { Sequelize } from "sequelize";

const cambioBodega = async (req, res) => {
    const { idPlancha, idBodega } = req.query;

    try {
        const plancha = await Plancha.findByPk(idPlancha);

        if (plancha) {
            await Plancha.update(
                { bodegaId: idBodega },
                { where: { id: idPlancha } }
            );

            // Enviar la respuesta JSON con la plancha actualizada
            res.json({ success: true, message: `Se actualizó la plancha con ID ${idPlancha} con bodegaId ${idBodega}.`});
        } else {
            // Si no se encontró la plancha, enviar un mensaje de error
            res.status(404).json({ success: false, message: `No se encontró ninguna plancha con ID ${idPlancha}.` });
        }
    } catch (error) {
        // Manejar errores
        console.error('Error al actualizar la plancha:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar la plancha.' });
    }
};



const getIdNombres = async (req, res) => {

    const { modeloId, bodegaId } = req.query;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT id,nombre FROM planchas WHERE modeloId=:modeloId and bodegaId=:bodegaId;
    
    `;

    sequelize.query(query, {
        replacements: { modeloId, bodegaId }, // Use replacements for parameterized query
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


const getIdNombresDisponibles = async (req, res) => {
    const { modeloId, bodegaId, estado } = req.query;
    const replacements = { modeloId, estado };

    let query = `
        SELECT id, nombre FROM planchas
        WHERE modeloId = :modeloId 
        AND estado = 1
    `;

    if (bodegaId) {
        query += ` AND bodegaId = :bodegaId`;
        replacements.bodegaId = bodegaId;
    }

    try {
        const results = await sequelize.query(query, {
            replacements,
            type: Sequelize.QueryTypes.SELECT
        });
        res.status(200).json({ data: results });
    } catch (error) {
        console.error('Error executing raw query:', error);
        res.status(500).json({ error: 'Error executing raw query' });
    }
};


const gastarPlancha = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const plancha = await Plancha.findByPk(id);
        if (!plancha) {
            return res.status(404).json({ error: "Plancha no encontrada" });
        }
        plancha.nombre = nombre;
        plancha.alto = 0;
        plancha.ancho = 0;
        plancha.despunte1A = 0;
        plancha.despunte1B = 0;
        plancha.despunte2A = 0;
        plancha.despunte2B = 0;
        plancha.despunte3A = 0;
        plancha.despunte3B = 0;
        plancha.estado = 0;
        await plancha.save();
        res.json(plancha);
    } catch (error) {
        console.error("Error al actualizar la plancha:", error);
        res.status(500).json({ error: "Error al actualizar la plancha en la base de datos" });
    }
};



// Create a new plancha
const addPlancha = async (req, res) => {
    try {
        const { nombre, alto, ancho, despunte1A, despunte1B, despunte2A, despunte2B, despunte3A, despunte3B, modeloId, bodegaId } = req.body;
        const nuevaPlancha = await Plancha.create({ nombre, alto, ancho, despunte1A, despunte1B, despunte2A, despunte2B, despunte3A, despunte3B, modeloId, bodegaId });
        res.status(201).json(nuevaPlancha.id);
    } catch (error) {
        console.error("Error al crear la plancha:", error);
        res.status(500).json({ error: "Error al crear la plancha en la base de datos" });
    }
}

// Get all planchas
const findAll = async (req, res) => {
    try {
        const planchas = await Plancha.findAll();
        res.json(planchas);
    } catch (error) {
        console.error("Error al obtener las planchas:", error);
        res.status(500).json({ error: "Error al obtener las planchas de la base de datos" });
    }
}

// Get single plancha
const getPlancha = async (req, res) => {
    const { id } = req.params;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT planchas.id,planchas.nombre,alto,ancho, despunte1A, despunte1B, despunte2A, despunte2B, despunte3A, despunte3B , modelos.preciom2, estado
        FROM (planchas JOIN modelos ON (planchas.modeloId = modelos.id))
        WHERE planchas.id= :id;
        
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

};

// Update a plancha by ID
const updatePlancha = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, alto, ancho, despunte1A, despunte1B, despunte2A, despunte2B, despunte3A, despunte3B, estado } = req.body;
        const plancha = await Plancha.findByPk(id);
        if (!plancha) {
            return res.status(404).json({ error: "Plancha no encontrada" });
        }
        plancha.nombre = nombre;
        plancha.alto = alto;
        plancha.ancho = ancho;
        plancha.despunte1A = despunte1A;
        plancha.despunte1B = despunte1B;
        plancha.despunte2A = despunte2A;
        plancha.despunte2B = despunte2B;
        plancha.despunte3A = despunte3A;
        plancha.despunte3B = despunte3B;
        plancha.estado = estado;

        await plancha.save();
        res.json(plancha);
    } catch (error) {
        console.error("Error al actualizar la plancha:", error);
        res.status(500).json({ error: "Error al actualizar la plancha en la base de datos" });
    }
};

// Delete a plancha by ID
const deletePlancha = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPlancha = await Plancha.destroy({ where: { id } });
        if (!deletedPlancha) {
            return res.status(404).json({ error: "Plancha no encontrada" });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar la plancha:", error);
        res.status(500).json({ error: "Error al eliminar la plancha de la base de datos" });
    }
}

export {
    addPlancha,
    findAll,
    updatePlancha,
    deletePlancha,
    getPlancha,
    getIdNombres,
    gastarPlancha,
    cambioBodega,
    getIdNombresDisponibles
};
