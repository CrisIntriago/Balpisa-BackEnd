import express from "express";
import { addMovimiento, findAllMovimientos, movimientosEnFecha, nFilas, deleteMovimiento, updateMovimiento, movimientosPorModelo, nFilasModelo } from "../controllers/movimientoUnitarioController.js";

const router = express.Router();

// Create a new bodega
router.post("/", addMovimiento);

// Get all bodegas
router.get("/", findAllMovimientos);
// Get all bodegas
router.post("/movimientosEnFecha", movimientosEnFecha);


router.post("/movimientosPorModelo", movimientosPorModelo)

router.post("/movimientosPorModelo/nFilas", nFilasModelo)


// modificar factura

router.put("/:id", updateMovimiento);

router.post("/nFilas", nFilas)



// Delete a movimiento by ID
router.post("/:id", deleteMovimiento);


export default router;