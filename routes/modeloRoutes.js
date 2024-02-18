import express from "express";

const router = express.Router();

import {
  findAll,
} from "../controllers/modeloController.js";



router.get("/findAll", findAll); 




export default router;