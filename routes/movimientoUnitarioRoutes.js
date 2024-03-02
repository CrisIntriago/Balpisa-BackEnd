import express from "express";
import { addMovimiento, findAllMovimientos} from "../controllers/movimientoUnitarioController.js";

const router = express.Router();

// Create a new bodega
router.post("/", addMovimiento);

// Get all bodegas
router.get("/", findAllMovimientos);


export default router;