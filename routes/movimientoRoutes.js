import express from "express";
import { addMovimiento, findAllMovimientos, updateMovimiento, deleteMovimiento, movimientosEnFecha , nFilas, movimientosPorPlancha, imprimir} from "../controllers/movimientoController.js";

const router = express.Router();

// Create a new movimiento
router.post("/", addMovimiento);

// Get all movimientos
router.get("/", findAllMovimientos);

// Update a movimiento by ID
router.put("/:id", updateMovimiento);

// Delete a movimiento by ID
router.delete("/:id", deleteMovimiento);

// Obtener todos los movimientos en un rango de fecha

router.post("/movimientosEnFecha", movimientosEnFecha)

router.post("/nFilas", nFilas)


router.post("/imprimir", imprimir);



//obtener movimientos Por plancha

router.get("/plancha/:id", movimientosPorPlancha)


export default router;
