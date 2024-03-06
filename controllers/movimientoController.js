import { Movimiento } from "../models/Relaciones.js";
import { sequelize } from "../database/database.js";
import { Sequelize } from "sequelize";

const nFilas = async (req, res) => {
  try {
    // Contar el número de filas en la tabla
    const count = await Movimiento.count();
    res.status(201).send({ "nFilas": count });
  } catch (error) {
    res.status(500).send({ message: "Error al contar número de filas", error: error.message });
  }
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

  // Consulta para obtener los movimientos con paginación
  const queryMovimientos = `
    SELECT mov.id, mov.tipo, b.nombre AS nombreBodega, f.nombre AS nombreFamilia, mo.nombre AS nombreModelo, mo.CodigoContable, mov.valorRegistro, p.nombre AS nombrePlancha, mov.nFactura 
    FROM movimientos AS mov 
    JOIN (planchas AS p, modelos AS mo, familias AS f, bodegas AS b) ON (mov.planchaId = p.id AND mo.id = p.modeloId AND mo.familiaId = f.id AND b.id = p.bodegaId)
    WHERE mov.createdAt BETWEEN :fechaInicio AND :fechaFin
    LIMIT 5 OFFSET :offset;
    `;

  // Consulta para contar el total de filas sin paginación
  const queryTotal = `
    SELECT COUNT(*) AS total
    FROM movimientos AS mov 
    JOIN (planchas AS p, modelos AS mo, familias AS f, bodegas AS b) ON (mov.planchaId = p.id AND mo.id = p.modeloId AND mo.familiaId = f.id AND b.id = p.bodegaId)
    WHERE mov.createdAt BETWEEN :fechaInicio AND :fechaFin;
    `;

  try {
    // Ejecutar ambas consultas de forma paralela
    const [resultados, total] = await Promise.all([
      sequelize.query(queryMovimientos, {
        replacements: {
          fechaInicio: fechaInicio + " 00:00:00",
          fechaFin: fechaFin + " 23:59:59",
          offset,
        },
        type: Sequelize.QueryTypes.SELECT,
      }),
      sequelize.query(queryTotal, {
        replacements: {
          fechaInicio: fechaInicio + " 00:00:00",
          fechaFin: fechaFin + " 23:59:59",
        },
        type: Sequelize.QueryTypes.SELECT,
      }),
    ]);

    // Enviar resultados y total como JSON
    res.status(201).json({ data: resultados, total: total[0].total });
  } catch (error) {
    console.error("Error executing raw query:", error);
    res.status(500).json({ error: "Error executing raw query" });
  }
};

export {
  addMovimiento,
  findAllMovimientos,
  updateMovimiento,
  deleteMovimiento,
  movimientosEnFecha,
  nFilas
};
