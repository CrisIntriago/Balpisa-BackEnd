import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET, { algorithm: "HS256" });



      const usuario = await Usuario.findByPk(decoded.id, {
        attributes: ["id", "nombre"],
      });



      req.usuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        token
      }
      

      return next();

    } catch (error) {

      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;