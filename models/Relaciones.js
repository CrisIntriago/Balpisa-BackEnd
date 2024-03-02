import Bodega from "./Bodega.js";
import Familia from "./Familia.js";
import Modelo from "./Modelo.js";
import Movimiento from "./Movimiento.js";
import Plancha from "./Plancha.js";
import MovimientoUnitario from "./MovimientoUnitario.js"
import ModeloUnitario from "./ModeloUnitario.js"

Familia.hasMany(Modelo);
Modelo.belongsTo(Familia);

Modelo.hasMany(Plancha);
Plancha.belongsTo(Modelo);


Bodega.hasMany(Plancha);
Plancha.belongsTo(Bodega);

Plancha.hasMany(Movimiento);
Movimiento.belongsTo(Plancha);

Familia.hasMany(ModeloUnitario);
ModeloUnitario.belongsTo(Familia);

ModeloUnitario.hasMany(MovimientoUnitario);
MovimientoUnitario.belongsTo(ModeloUnitario);



export{
    Familia,
    Modelo,
    Bodega,
    Plancha,
    Movimiento,
    ModeloUnitario,
    MovimientoUnitario,
}