import { z } from 'zod';

export const crearServicioSchema = z.object({
    tipo_servicio: z.enum(['REPARACION', 'CHEQUEO'], {
        error: () => ({ message: "Tipo de servicio inválido" })
    }),
    descripcion: z.string().min(1, 'La descripción es requerida').max(255, 'La descripción debe tener menos de 255 caracteres'),
    num_bicicleta: z.string().min(1, 'El número de bicicleta es requerido').max(50, 'El número de bicicleta debe tener menos de 50 caracteres'),
    precio_base: z.number().nonnegative('El precio base no puede ser negativo').max(1000000, 'El precio base es demasiado alto'),
    precio_total: z.number().nonnegative('El precio total no puede ser negativo').max(1000000, 'El precio total es demasiado alto'),
    costo_piezas: z.number().nonnegative('El costo de piezas no puede ser negativo').max(1000000, 'El costo de piezas es demasiado alto'),
    estado: z.enum(['PENDIENTE', 'EN_PROGRESO', 'FINALIZADO', 'ENTREGADO'], { 
        error: () => ({ message: "Estado inválido" })
    }),
    empleado_id: z.number().int().positive('El ID del empleado debe ser un número positivo').max(1000000, 'El ID del empleado es demasiado alto'),
    fecha_ingreso: z.date().optional(),
    fecha_entrega: z.date().optional(),
    items_reparacion: z.array(z.object({
        item_id: z.number().int().positive('El ID del ítem debe ser un número positivo').max(1000000, 'El ID del ítem es demasiado alto'),
        descontar: z.number().int().positive('La cantidad debe ser un número positivo').max(1000000, 'La cantidad es demasiado alta'),
    })),
}).strict();

export type CrearServicioDto = z.infer<typeof crearServicioSchema>;