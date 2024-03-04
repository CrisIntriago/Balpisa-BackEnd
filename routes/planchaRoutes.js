import express from "express";
import { addPlancha, findAll, updatePlancha, deletePlancha, getPlancha,getIdNombres,gastarPlancha, cambioBodega, getIdNombresDisponibles } from "../controllers/planchaController.js";

const router = express.Router();

// Get single plancha
router.get("/:id", getPlancha);

// obtener id y nombre según Modelo
router.get("/idNombres/todos", getIdNombres);


router.get("/idNombres/disponibles", getIdNombresDisponibles);

// Update a plancha by ID
router.put("/:id", updatePlancha);

//Gastar plancha
router.put("/gastarPlancha/:id", gastarPlancha);

//Cambio de Bodega
router.put("/cambioBodega/datos", cambioBodega);


// Delete a plancha by ID
router.delete("/:id", deletePlancha);

// Create a new plancha
router.post("/", addPlancha);

// Get all planchas
router.get("/", findAll);



export default router;
