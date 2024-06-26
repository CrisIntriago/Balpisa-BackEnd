import jwt from "jsonwebtoken";

const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn:"30d",

    });
};

export default generarJWT;