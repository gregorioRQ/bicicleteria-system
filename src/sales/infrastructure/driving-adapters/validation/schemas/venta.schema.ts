import { z } from 'zod';

export const crearVentaSchema = z.object({
  total: z.number().positive('El total debe ser mayor a 0'),
  empleado_id: z.number().int().positive('El ID del empleado debe ser un número positivo'),
  metodo_pago: z.enum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA'], 'Método de pago inválido'),
  tipo_venta: z.enum(['SERVICIO', 'PRODUCTO'], 'Tipo de venta inválido'),

  servicio_id: z.number().int().positive('El ID del servicio debe ser un número positivo'),
  cliente_nombre: z.string().min(1, 'El nombre del cliente es requerido'),
  cliente_telefono: z.string().min(1, 'El teléfono del cliente es requerido'),
  cliente_dni: z.string().min(1, 'El DNI del cliente es requerido')
}).strict();

export type CrearVentaDto = z.infer<typeof crearVentaSchema>;