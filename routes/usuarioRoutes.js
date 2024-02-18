import express from "express";

const router = express.Router();

import {
  registrar,
  autenticar,
  perfil,
} from "../controllers/usuarioController.js";


import checkAuth from "../middleware/checkAuth.js";


// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar); // Crea un nuevo usuario
router.get("/perfil", checkAuth, perfil);


export default router;