"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarServicioSchema = exports.crearServicioSchema = void 0;
const zod_1 = require("zod");
exports.crearServicioSchema = zod_1.z.object({
    tipo_servicio: zod_1.z.enum(['REPARACION', 'CHEQUEO'], {
        error: () => ({ message: "Tipo de servicio inválido" })
    }),
    num_bicicleta: zod_1.z.number("Debe ser un número entero").min(1, 'El número de bicicleta es requerido').int(),
    precio_base: zod_1.z.number("Debe ser un número").nonnegative('El precio base no puede ser negativo').max(1000000, 'El precio base es demasiado alto'),
    precio_total: zod_1.z.number("Debe ser un número").nonnegative('El precio total no puede ser negativo').max(1000000, 'El precio total es demasiado alto').optional(),
    costo_piezas: zod_1.z.number("Debe ser un número").nonnegative('El costo de piezas no puede ser negativo').max(1000000, 'El costo de piezas es demasiado alto').optional(),
    estado: zod_1.z.enum(['PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'ENTREGADO'], {
        error: () => ({ message: "Estado inválido" })
    }),
    empleado_id: zod_1.z.number("Debe ser un número entero").int().positive('El ID del empleado debe ser un número positivo').max(1000000, 'El ID del empleado es demasiado alto'),
    fecha_ingreso: zod_1.z.date().optional(),
    fecha_entrega: zod_1.z.date().optional(),
    items_reparacion: zod_1.z.array(zod_1.z.object({
        item_id: zod_1.z.number("Debe ser un número entero").int().positive('El ID del ítem debe ser un número positivo').max(1000000, 'El ID del ítem es demasiado alto'),
        descontar: zod_1.z.number("Debe ser un número entero").int().positive('La cantidad debe ser un número positivo').max(1000000, 'La cantidad es demasiado alta'),
    })),
}).strict();
exports.actualizarServicioSchema = zod_1.z.object({
    estado: zod_1.z.enum(['PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'ENTREGADO'], {
        error: () => ({ message: "Estado inválido, solo se permite: PENDIENTE, EN_PROGRESO, FINALIZADO, ENTREGADO" })
    }),
    id: zod_1.z.number("Debe ser un número").int("Debe ser un número entero").positive('El ID del servicio debe ser un número positivo').max(1000000, 'El ID del servicio es demasiado alto'),
    tipo_servicio: zod_1.z.enum(['REPARACION', 'CHEQUEO'], {
        error: () => ({ message: "Tipo de servicio inválido, solo ser permite: REPARACION, CHEQUEO" })
    }),
    num_bicicleta: zod_1.z.number("Debe ser un número").min(1, 'El número de bicicleta es requerido').int("Debe ser un número entero"),
    precio_base: zod_1.z.number("Debe ser un número").nonnegative('El precio base no puede ser negativo').max(1000000, 'El precio base es demasiado alto'),
    precio_total: zod_1.z.number("Debe ser un número").nonnegative('El precio total no puede ser negativo').max(1000000, 'El precio total es demasiado alto').optional(),
    costo_piezas: zod_1.z.number("Debe ser un número").nonnegative('El costo de piezas no puede ser negativo').max(1000000, 'El costo de piezas es demasiado alto').optional(),
    empleado_id: zod_1.z.number("Debe ser un número entero").int().positive('El ID del empleado debe ser un número positivo').max(1000000, 'El ID del empleado es demasiado alto'),
    fecha_ingreso: zod_1.z.string().optional(),
    fecha_entrega: zod_1.z.date().optional(),
    items_reparacion: zod_1.z.array(zod_1.z.object({
        nombre: zod_1.z.string("Debe ser una cadena de caracteres").max(150, 'Máximo 150 caracteres'),
        marca: zod_1.z.string("Debe ser una cadena de caracteres").max(150, 'Máximo 150 caracteres'),
        precioVenta: zod_1.z.number("Debe ser un número"),
        cantidad: zod_1.z.number("Debe ser un número").int("Debe ser un número entero")
    })).optional(),
    descripcion: zod_1.z.string("Debe ser una cadena de caracteres").max(500, "Debe tener menos de 500 caracteres"),
}).strict();
