import express from "express";
import { addPlancha, findAll, updatePlancha, deletePlancha } from "../controllers/planchaController.js";

const router = express.Router();

// Create a new plancha
router.post("/", addPlancha);

// Get all planchas
router.get("/", findAll);

// Update a plancha by ID
router.put("/:id", updatePlancha);

// Delete a plancha by ID
router.delete("/:id", deletePlancha);

export default router;
