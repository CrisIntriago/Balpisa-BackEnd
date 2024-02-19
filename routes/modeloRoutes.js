import express from "express";
import { addModelo, findAll, updateModelo, deleteModelo, getModelosFromFamilia } from "../controllers/modeloController.js";

const router = express.Router();

// Create a new modelo
router.post("/", addModelo);

// Get all modelos
router.get("/", findAll);

// Update a modelo by ID
router.put("/:id", updateModelo);

// Delete a modelo by ID
router.delete("/:id", deleteModelo);


router.post("/familia/modelos/", getModelosFromFamilia)

export default router;