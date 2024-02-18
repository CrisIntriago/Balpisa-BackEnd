import express from "express";
import { addFamilia, findAll, updateFamilia, deleteFamilia } from "../controllers/familiaController.js";

const router = express.Router();

// Create a new familia
router.post("/", addFamilia);

// Get all familias
router.get("/", findAll);

// Update a familia by ID
router.put("/:id", updateFamilia);

// Delete a familia by ID
router.delete("/:id", deleteFamilia);

export default router;
