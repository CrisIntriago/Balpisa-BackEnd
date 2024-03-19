import express from "express";
import { addModelo, findAll, updateModelo, deleteModelo, getModelosM2FromFamilia, allPlanchas , getModelosFromFamilia, getModelo} from "../controllers/modeloController.js";

const router = express.Router();

// Create a new modelo
router.post("/", addModelo);

// Get all modelos
router.get("/", findAll);


//ESTE ES EL GET MODELO NECESARIO PARA LLENAR LUEGO EN modificar modelo
router.get("/:id", getModelo);



// Update a modelo by ID
router.put("/:id", updateModelo);

// Delete a modelo by ID
router.delete("/:id", deleteModelo);


router.post("/m2Disponibles/", getModelosM2FromFamilia);

router.post("/deFamilia", getModelosFromFamilia);


router.get("/allPlanchas", allPlanchas);

export default router;