import express from "express";
import { getModelosM2FromFamilia , getModelosFromFamilia} from "../controllers/modeloUnitarioController.js";

const router = express.Router();


/*
// Create a new modelo
router.post("/", addModelo);

// Get all modelos
router.get("/", findAll);

// Update a modelo by ID
router.put("/:id", updateModelo);

// Delete a modelo by ID
router.delete("/:id", deleteModelo);

*/

router.post("/m2Disponibles", getModelosM2FromFamilia);

router.post("/deFamilia", getModelosFromFamilia);


export default router;