import Bodega from "./Bodega.js";
import Familia from "./Familia.js";
import Modelo from "./Modelo.js";
import Movimiento from "./Movimiento.js";
import Plancha from "./Plancha.js";


Familia.hasMany(Modelo);
Modelo.belongsTo(Familia);

Modelo.hasMany(Plancha);
Plancha.belongsTo(Modelo);


Bodega.hasMany(Plancha);
Plancha.belongsTo(Bodega);

Plancha.hasMany(Movimiento);
Movimiento.belongsTo(Plancha);



export{
    Familia,
    Modelo,
    Bodega,
    Plancha,
    Movimiento
}