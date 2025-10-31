"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearVentaSchema = void 0;
const zod_1 = require("zod");
exports.crearVentaSchema = zod_1.z.object({
    total: zod_1.z.number().positive('El total debe ser mayor a 0'),
    empleado_id: zod_1.z.number().int().positive('El ID del empleado debe ser un número positivo'),
    metodo_pago: zod_1.z.enum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA'], 'Método de pago inválido'),
    tipo_venta: zod_1.z.enum(['SERVICIO', 'PRODUCTO'], 'Tipo de venta inválido'),
    servicio_id: zod_1.z.number().int().positive('El ID del servicio debe ser un número positivo'),
    cliente_nombre: zod_1.z.string().min(1, 'El nombre del cliente es requerido'),
    cliente_telefono: zod_1.z.string().min(1, 'El teléfono del cliente es requerido'),
    cliente_dni: zod_1.z.string().min(1, 'El DNI del cliente es requerido')
}).strict();
