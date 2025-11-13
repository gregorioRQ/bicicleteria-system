"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Formatear fechas para MySQL
const formatearFecha = (fecha) => {
    if (!fecha)
        return null;
    const d = fecha instanceof Date ? fecha : new Date(fecha);
    return d.toISOString().slice(0, 19).replace('T', ' ');
};
exports.default = formatearFecha;
