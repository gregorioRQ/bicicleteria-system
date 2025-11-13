"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarStockSchema = exports.crearItemSchema = void 0;
const zod_1 = require("zod");
exports.crearItemSchema = zod_1.z.object({
    nombre: zod_1.z.string("Debe ser una cadena de caracteres").max(30, "Debe tener menos de 30 caracteres"),
    marca: zod_1.z.string("Debe ser una cadena de caracteres").max(30, "Debe tener menos de 30 caracteres"),
    precioCompra: zod_1.z.number("Debe ser un número").positive("El precio de compra debe ser un número positivo").max(9000000, "valor muy elevado"),
    precioVenta: zod_1.z.number("Debe ser un número").positive("El precio de compra debe ser un número positivo").max(9000000, "valor muy elevado"),
    stock: zod_1.z.number("Debe ser un número").nonnegative("No puede ser un número negativo").max(40, "Valor muy elevado").int("Debe ser un número entero").min(1, "Campo requerido"),
    fechaIngreso: zod_1.z.date().optional()
}).strict();
exports.actualizarStockSchema = zod_1.z.object({
    id: zod_1.z.number("Debe ser un número").nonnegative("No puede ser un número negativo").int("Solo se pueden ingresar enteros").max(9999999, "Valor muy elevado").min(1, "Campo requerido"),
    cantidad: zod_1.z.number("Debe ser un número").nonnegative("No puede ser un número negativo").int("Solo se pueden ingresar enteros").max(30, "Valor muy elevado").min(1, "Campo requerido"),
});
