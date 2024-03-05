import express from "express";
import { addMovimiento, findAllMovimientos , movimientosEnFecha} from "../controllers/movimientoUnitarioController.js";

const router = express.Router();

// Create a new bodega
router.post("/", addMovimiento);

// Get all bodegas
router.get("/", findAllMovimientos);
// Get all bodegas
router.post("/movimientosEnFecha", movimientosEnFecha);


export default router;