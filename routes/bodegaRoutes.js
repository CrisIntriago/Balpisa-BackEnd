import express from "express";
import { addBodega, findAllBodegas, updateBodega, deleteBodega } from "../controllers/bodegaController.js";

const router = express.Router();

// Create a new bodega
router.post("/", addBodega);

// Get all bodegas
router.get("/", findAllBodegas);

// Update a bodega by ID
router.put("/:id", updateBodega);

// Delete a bodega by ID
router.delete("/:id", deleteBodega);

export default router;
