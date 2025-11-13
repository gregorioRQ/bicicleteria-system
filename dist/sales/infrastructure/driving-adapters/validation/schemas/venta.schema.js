"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearVentaSchema = void 0;
const zod_1 = require("zod");
exports.crearVentaSchema = zod_1.z.object({
    empleado_id: zod_1.z.number("Debe ser un número").int("Debe ser un numero entero").positive('El ID del empleado debe ser un número positivo'),
    metodo_pago: zod_1.z.enum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA'], 'Método de pago inválido, solo se permite: EFECTIVO, TARJETA, TRANSFERENCIA'),
    tipo_venta: zod_1.z.enum(['SERVICIO', 'PRODUCTO'], 'Tipo de venta inválido, solo se permite: SERVICIO, PRODUCTO'),
    servicios_ids: zod_1.z.array(zod_1.z.number().int().positive('El ID del servicio debe ser un número entero positivo')).nonempty('Debe indicar al menos un servicio'),
    cliente_nombre: zod_1.z.string("Debe ser una cadena de caracteres").min(1, 'El nombre del cliente es requerido').max(100, "Debe tener menos de 100 caracteres"),
    cliente_telefono: zod_1.z.string("Debe ser una cadena de caracteres").min(1, 'El teléfono del cliente es requerido').max(100, "Debe tener menos de 100 caracteres"),
    cliente_dni: zod_1.z.string("Debe ser una cadena de caracteres").min(1, 'El DNI del cliente es requerido').max(100, "Debe tener menos de 100 caracteres")
}).strict();
