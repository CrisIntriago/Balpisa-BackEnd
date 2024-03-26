import express from "express";
import { getModelosM2FromFamilia, getModelosFromFamilia, incrementarCantidad, decrementarCantidad, getModeloUnitarioById ,addModelo,updateModelo, getCantidadXBodega, getCantidadEnBodega} from "../controllers/modeloUnitarioController.js";

const router = express.Router();



router.post("/", addModelo);

router.get("/:id", getModeloUnitarioById);


// Update a modelo by ID
router.put("/:id", updateModelo);
/*
// Delete a modelo by ID
router.delete("/:id", deleteModelo);

*/

router.get("/cantidadXBodega/:modeloId", getCantidadXBodega)


router.get("/cantidadXBodega/:modeloId/:bodegaId", getCantidadEnBodega)

router.post("/m2Disponibles", getModelosM2FromFamilia);

router.post("/deFamilia", getModelosFromFamilia);

router.put("/operacion/incrementar/:modeloId/:bodegaId/:cantidad", incrementarCantidad);
router.put("/operacion/decrementar/:modeloId/:bodegaId/:cantidad", decrementarCantidad);


export default router;