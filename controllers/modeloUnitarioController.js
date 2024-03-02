import { ModeloUnitario } from "../models/Relaciones.js";
import { sequelize } from "../database/database.js";
import Sequelize from "sequelize";

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
        SELECT mu.nombre, mu.cantidad as unidades, mu.m2PorUnidad * mu.cantidad as m2Disponibles, mu.precio as "precio/m2" 
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


export {
    getModelosM2FromFamilia,
    getModelosFromFamilia,
};
