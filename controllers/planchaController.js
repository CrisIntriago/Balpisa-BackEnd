import {Plancha} from "../models/Relaciones.js";

const getPlanchaIdNombre = async (req, res) => {

    const { modeloId } = req.params;

    // Parameterized query to prevent SQL injection
    const query = `
        SELECT * FROM planchas WHERE modeloId=:modeloId;
    
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



// Create a new plancha
const addPlancha = async (req, res) => {
    try {
        const { nombre, alto, ancho } = req.body;
        const nuevaPlancha = await Plancha.create({ nombre, alto, ancho });
        res.status(201).json(nuevaPlancha);
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
    console.log("thehell")
    try {
        const { id } = req.params;
        const plancha = await Plancha.findByPk(id);
        if (!plancha) {
            return res.status(404).json({ error: "Plancha no encontrada" });
        }

        res.json(plancha);
    } catch (error) {
        console.error("Error al actualizar la plancha:", error);
        res.status(500).json({ error: "Error al actualizar la plancha en la base de datos" });
    }
};

// Update a plancha by ID
const updatePlancha = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, alto, ancho } = req.body;
        const plancha = await Plancha.findByPk(id);
        if (!plancha) {
            return res.status(404).json({ error: "Plancha no encontrada" });
        }
        plancha.nombre = nombre;
        plancha.alto = alto;
        plancha.ancho = ancho;
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
    getPlanchaIdNombre
};
