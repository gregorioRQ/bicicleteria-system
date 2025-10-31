"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = exports.Rol = void 0;
var Rol;
(function (Rol) {
    Rol["MECANICO"] = "MECANICO";
    Rol["VENDEDOR"] = "VENDEDOR";
})(Rol || (exports.Rol = Rol = {}));
class Empleado {
    constructor(id, nombre, dni, rol, telefono) {
        this.id = id;
        this.nombre = nombre;
        this.dni = dni;
        this.rol = rol;
        this.telefono = telefono;
    }
}
exports.Empleado = Empleado;
