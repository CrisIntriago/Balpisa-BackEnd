import express from "express";
import { addPlancha, findAll, updatePlancha, deletePlancha, getPlancha } from "../controllers/planchaController.js";

const router = express.Router();

// Get single plancha
router.get("/:id", getPlancha);

// Update a plancha by ID
router.put("/:id", updatePlancha);

// Delete a plancha by ID
router.delete("/:id", deletePlancha);

// Create a new plancha
router.post("/", addPlancha);

// Get all planchas
router.get("/", findAll);



export default router;
