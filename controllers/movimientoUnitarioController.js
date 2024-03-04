import { MovimientoUnitario } from '../models/Relaciones.js'; // Ajusta la ruta según sea necesario

const addMovimiento = async (req, res) => {
    try {
        const { tipo, cantidadCambiada, nFactura, precioVenta, modeloUnitarioId } = req.body;
        const movimiento = await MovimientoUnitario.create({tipo , cantidadCambiada, nFactura, precioVenta, modeloUnitarioId});
        res.status(201).send(movimiento);
    } catch (error) {
        res.status(500).send({ message: "Error al crear el movimiento", error: error.message });
    }
};

const findAllMovimientos = async (req, res) => {
    try {
        const movimientos = await MovimientoUnitario.findAll();
        res.status(200).send(movimientos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los movimientos", error: error.message });
    }
};


export {
    addMovimiento,
    findAllMovimientos,
};
