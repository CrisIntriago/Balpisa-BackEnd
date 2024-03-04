import express from "express";
import { getModelosM2FromFamilia, getModelosFromFamilia, incrementarCantidad, decrementarCantidad, getModeloUnitarioById } from "../controllers/modeloUnitarioController.js";

const router = express.Router();


/*
router.post("/", addModelo);
*/
router.get("/:id", getModeloUnitarioById);
/*

// Update a modelo by ID
router.put("/:id", updateModelo);

// Delete a modelo by ID
router.delete("/:id", deleteModelo);

*/

router.post("/m2Disponibles", getModelosM2FromFamilia);

router.post("/deFamilia", getModelosFromFamilia);

router.patch("/operacion/:id/incrementar/:cantidad", incrementarCantidad);
router.patch("/operacion/:id/decrementar/:cantidad", decrementarCantidad);


export default router;