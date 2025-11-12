import { z } from 'zod';

export const crearServicioSchema = z.object({
    tipo_servicio: z.enum(['REPARACION', 'CHEQUEO'], {
        error: () => ({ message: "Tipo de servicio inválido" })
    }),
    num_bicicleta: z.number("Debe ser un número entero").min(1, 'El número de bicicleta es requerido').int(),
    precio_base: z.number("Debe ser un número").nonnegative('El precio base no puede ser negativo').max(1000000, 'El precio base es demasiado alto'),
    precio_total: z.number("Debe ser un número").nonnegative('El precio total no puede ser negativo').max(1000000, 'El precio total es demasiado alto').optional(),
    costo_piezas: z.number("Debe ser un número").nonnegative('El costo de piezas no puede ser negativo').max(1000000, 'El costo de piezas es demasiado alto').optional(),
    estado: z.enum(['PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'ENTREGADO'], { 
        error: () => ({ message: "Estado inválido" })
    }),
    empleado_id: z.number("Debe ser un número entero").int().positive('El ID del empleado debe ser un número positivo').max(1000000, 'El ID del empleado es demasiado alto'),
    fecha_ingreso: z.date().optional(),
    fecha_entrega: z.date().optional(),
    items_reparacion: z.array(z.object({
        item_id: z.number("Debe ser un número entero").int().positive('El ID del ítem debe ser un número positivo').max(1000000, 'El ID del ítem es demasiado alto'),
        descontar: z.number("Debe ser un número entero").int().positive('La cantidad debe ser un número positivo').max(1000000, 'La cantidad es demasiado alta'),
    })),
}).strict();


export const actualizarServicioSchema = z.object({
    estado: z.enum(['PENDIENTE', 'EN_PROCESO', 'FINALIZADO', 'ENTREGADO'], { 
        error: () => ({ message: "Estado inválido, solo se permite: PENDIENTE, EN_PROGRESO, FINALIZADO, ENTREGADO" })
    }),
    id: z.number("Debe ser un número").int("Debe ser un número entero").positive('El ID del servicio debe ser un número positivo').max(1000000, 'El ID del servicio es demasiado alto'),

    tipo_servicio: z.enum(['REPARACION', 'CHEQUEO'], {
        error: () => ({ message: "Tipo de servicio inválido, solo ser permite: REPARACION, CHEQUEO" })
    }),
    num_bicicleta: z.number("Debe ser un número").min(1, 'El número de bicicleta es requerido').int("Debe ser un número entero"),
    precio_base: z.number("Debe ser un número").nonnegative('El precio base no puede ser negativo').max(1000000, 'El precio base es demasiado alto'),
    precio_total: z.number("Debe ser un número").nonnegative('El precio total no puede ser negativo').max(1000000, 'El precio total es demasiado alto').optional(),
    costo_piezas: z.number("Debe ser un número").nonnegative('El costo de piezas no puede ser negativo').max(1000000, 'El costo de piezas es demasiado alto').optional(),
    empleado_id: z.number("Debe ser un número entero").int().positive('El ID del empleado debe ser un número positivo').max(1000000, 'El ID del empleado es demasiado alto'),
    fecha_ingreso: z.string().optional(),
    fecha_entrega: z.date().optional(),
    items_reparacion: z.array(z.object({
        nombre: z.string("Debe ser una cadena de caracteres").max(150, 'Máximo 150 caracteres'),
        marca: z.string("Debe ser una cadena de caracteres").max(150, 'Máximo 150 caracteres'),
        precioVenta: z.number("Debe ser un número"),
        cantidad: z.number("Debe ser un número").int("Debe ser un número entero")
    })).optional(),
    descripcion: z.string("Debe ser una cadena de caracteres").max(500, "Debe tener menos de 500 caracteres"),
}).strict();

export type CrearServicioDto = z.infer<typeof crearServicioSchema>;