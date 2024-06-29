import { Movimiento, MovimientoUnitario } from "../models/Relaciones.js";
import { sequelize } from "../database/database.js";
import { Sequelize } from "sequelize";

const imprimir = async (req, res) => {

  const { fechaInicio, fechaFin } = req.body;

  // Parameterized query to prevent SQL injection
  const queryPlanchas = `
      SELECT mov.id, mov.tipo, b.nombre AS nombreBodega, f.nombre AS nombreFamilia, mo.nombre AS nombreModelo, mo.CodigoContable, mov.valorRegistro, p.nombre AS nombrePlancha, mov.nFactura 
      FROM movimientos AS mov 
      JOIN (planchas AS p, modelos AS mo, familias AS f, bodegas AS b) ON (mov.planchaId = p.id AND mo.id = p.modeloId AND mo.familiaId = f.id AND b.id = p.bodegaId)
      WHERE mov.createdAt BETWEEN :fechaInicio AND :fechaFin
    `;


  const queryUnitarios = `
      SELECT movu.id, movu.tipo, modu.nombre, modu.codContable, movu.cantidadCambiada, movu.valorRegistro, movu.nFactura
      FROM movimientounitarios AS movu
      JOIN modelounitarios AS modu ON (movu.modeloUnitarioId = modu.id)
      WHERE movu.createdAt BETWEEN :fechaInicio AND :fechaFin
    `;


  try {
    const movimientosPlanchas = await sequelize.query(queryPlanchas, {
      replacements: { fechaInicio: fechaInicio + ' 00:00:00', fechaFin: fechaFin + ' 23:59:59' }, // Use replacements for parameterized query
      type: Sequelize.QueryTypes.SELECT // Specify the query type
    });

    const movimientosUnitarios = await sequelize.query(queryUnitarios, {
      replacements: { fechaInicio: fechaInicio + ' 00:00:00', fechaFin: fechaFin + ' 23:59:59' }, // Use replacements for parameterized query
      type: Sequelize.QueryTypes.SELECT // Specify the query type
    });

    res.status(201).json({
      movimientosPlanchas: movimientosPlanchas,
      movimientosUnitarios: movimientosUnitarios
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error ejecutando la consulta" });
  }


};


const nFilas = async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;

  // Consulta para contar el total de filas sin paginación
  const queryFilas = `
    SELECT COUNT(*) AS total
    FROM movimientos AS mov 
    JOIN (planchas AS p, modelos AS mo, familias AS f, bodegas AS b) ON (mov.planchaId = p.id AND mo.id = p.modeloId AND mo.familiaId = f.id AND b.id = p.bodegaId)
    WHERE mov.createdAt BETWEEN :fechaInicio AND :fechaFin;
    `;

  sequelize.query(queryFilas, {
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

};

const movimientosPorPlancha = async (req, res) => {
  const { id } = req.params;
  const queryFilas = `
  SELECT movimientos.id, nFactura, Date(updatedAt) as fecha, tipo, valorRegistro , bodegas.nombre  FROM movimientos 
  JOIN planchas ON (planchaId = planchas.id) JOIN bodegas ON ( planchas.bodegaId = bodegas.id) WHERE planchaId = :id;`;

  sequelize.query(queryFilas, {
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

// Create a new movimiento
const addMovimiento = async (req, res) => {
  try {
    const { valorRegistro, planchaId, nFactura, precioVenta, tipo } = req.body;
    const nuevoMovimiento = await Movimiento.create({
      valorRegistro,
      planchaId,
      nFactura,
      precioVenta,
      tipo,
    });
    res.status(201).json(nuevoMovimiento);
  } catch (error) {
    console.error("Error al crear el movimiento:", error);
    res
      .status(500)
      .json({ error: "Error al crear el movimiento en la base de datos" });
  }
};

// Get all movimientos
const findAllMovimientos = async (req, res) => {
  try {
    const movimientos = await Movimiento.findAll();
    res.json(movimientos);
  } catch (error) {
    console.error("Error al obtener los movimientos:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los movimientos de la base de datos" });
  }
};

// Update a movimiento by ID
const updateMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const {nFactura } = req.body;
    const movimiento = await Movimiento.findByPk(id);
    if (!movimiento) {
      return res.status(404).json({ error: "Movimiento no encontrado" });
    }
    movimiento.nFactura = nFactura;
    await movimiento.save();
    res.json(movimiento);
  } catch (error) {
    console.error("Error al actualizar el movimiento:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar el movimiento en la base de datos" });
  }
};




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
    res
      .status(500)
      .json({ error: "Error al eliminar el movimiento de la base de datos" });
  }
};
const movimientosEnFecha = async (req, res) => {
  const { fechaInicio, fechaFin, offset } = req.body;

  // Parameterized query to prevent SQL injection
  const query = `
      SELECT mov.id, mov.tipo, b.nombre AS nombreBodega, f.nombre AS nombreFamilia, mo.nombre AS nombreModelo, mo.CodigoContable, mov.valorRegistro, p.nombre AS nombrePlancha, mov.nFactura 
      FROM movimientos AS mov 
      JOIN (planchas AS p, modelos AS mo, familias AS f, bodegas AS b) ON (mov.planchaId = p.id AND mo.id = p.modeloId AND mo.familiaId = f.id AND b.id = p.bodegaId)
      WHERE mov.createdAt BETWEEN :fechaInicio AND :fechaFin
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
const movimientosPorModelo = async (req, res) => {
  const { modeloId, offset } = req.body;

  // Construir la consulta dinámicamente según si el offset está presente o no
  let query = `
        SELECT mov.id, mov.createdAt as fecha, mov.tipo, b.nombre AS nombreBodega, p.nombre AS nombrePlancha, mov.valorRegistro as metraje, mov.nFactura 
        FROM movimientos AS mov 
        JOIN (planchas AS p, modelos AS mo, familias AS f, bodegas AS b) ON (mov.planchaId = p.id AND mo.id = p.modeloId AND mo.familiaId = f.id AND b.id = p.bodegaId)
        WHERE mo.id = :modeloId
        ORDER BY mov.createdAt DESC
    `;

  // Si el offset está presente, agregar la cláusula OFFSET a la consulta
  const replacements = { modeloId };
  if (offset !== -1) {
    query += 'LIMIT 5 OFFSET :offset';
    replacements.offset = offset;
  }

  console.log(query);

  try {
    const results = await sequelize.query(query, {
      replacements, // Usar replacements para la query parametrizada
      type: Sequelize.QueryTypes.SELECT // Especificar el tipo de query
    });
    // Enviar resultados como JSON
    res.status(201).json({ data: results });
  } catch (error) {
    console.error('Error ejecutando la query:', error);
    res.status(500).json({ error: 'Error ejecutando la query' });
  }
};


const nFilasModelo = async (req, res) => {

  const { modeloId, offset } = req.body;

  // Parameterized query to prevent SQL injection
  const query = `
        SELECT COUNT(*) AS total
        FROM movimientos AS mov 
        JOIN (planchas AS p, modelos AS mo, familias AS f, bodegas AS b) ON (mov.planchaId = p.id AND mo.id = p.modeloId AND mo.familiaId = f.id AND b.id = p.bodegaId)
        WHERE mo.id = :modeloId
        order by mov.createdAt desc
    `;

  sequelize.query(query, {
    replacements: { modeloId, offset }, // Use replacements for parameterized query
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
  addMovimiento,
  findAllMovimientos,
  updateMovimiento,
  deleteMovimiento,
  movimientosEnFecha,
  nFilas,
  movimientosPorPlancha,
  imprimir,
  movimientosPorModelo,
  nFilasModelo
};
