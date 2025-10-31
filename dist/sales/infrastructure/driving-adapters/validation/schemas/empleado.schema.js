"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarEmpleadoSchema = exports.crearEmpleadoSchema = void 0;
const zod_1 = require("zod");
exports.crearEmpleadoSchema = zod_1.z.object({
    nombre: zod_1.z.string().max(15, 'El nombre debe tener menos de 15 caracteres'),
    dni: zod_1.z.string().min(1, 'El DNI es requerido'),
    telefono: zod_1.z.string()
        .min(8, 'El teléfono debe tener al menos 8 dígitos')
        .regex(/^\d+$/, 'El teléfono solo debe contener números'),
    rol: zod_1.z.enum(["MECANICO", "VENDEDOR"], {
        error: () => ({ message: "Tipo de rol inválido" })
    })
}).strict();
exports.actualizarEmpleadoSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(1).optional(),
    dni: zod_1.z.string().min(1).optional(),
    telefono: zod_1.z.string().min(1).optional(),
    rol: zod_1.z.enum(["MECANICO", "VENDEDOR"], "Tipo de rol inválido")
}).strict();
