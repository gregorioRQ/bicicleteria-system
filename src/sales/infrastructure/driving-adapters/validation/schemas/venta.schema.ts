import { z } from 'zod';

export const crearVentaSchema = z.object({
  clienteId: z.number().int().positive('El ID del cliente debe ser un número positivo'),
  productos: z.array(z.object({
    id: z.number().int().positive(),
    cantidad: z.number().int().positive('La cantidad debe ser mayor a 0'),
    precio: z.number().positive('El precio debe ser mayor a 0')
  })).min(1, 'Debe incluir al menos un producto'),
  total: z.number().positive('El total debe ser mayor a 0')
}).strict();

export type CrearVentaDto = z.infer<typeof crearVentaSchema>;