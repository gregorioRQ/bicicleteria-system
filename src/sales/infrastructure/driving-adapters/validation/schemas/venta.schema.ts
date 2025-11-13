import { z } from 'zod';

export const crearVentaSchema = z.object({
  
  empleado_id: z.number("Debe ser un número").int("Debe ser un numero entero").positive('El ID del empleado debe ser un número positivo'),
  metodo_pago: z.enum(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA'], 'Método de pago inválido, solo se permite: EFECTIVO, TARJETA, TRANSFERENCIA'),
  tipo_venta: z.enum(['SERVICIO', 'PRODUCTO'], 'Tipo de venta inválido, solo se permite: SERVICIO, PRODUCTO'),

  servicios_ids: z.array(z.number().int().positive('El ID del servicio debe ser un número entero positivo')).nonempty('Debe indicar al menos un servicio'),
  cliente_nombre: z.string("Debe ser una cadena de caracteres").min(1, 'El nombre del cliente es requerido').max(100, "Debe tener menos de 100 caracteres"),
  cliente_telefono: z.string("Debe ser una cadena de caracteres").min(1, 'El teléfono del cliente es requerido').max(100, "Debe tener menos de 100 caracteres"),
  cliente_dni: z.string("Debe ser una cadena de caracteres").min(1, 'El DNI del cliente es requerido').max(100, "Debe tener menos de 100 caracteres")
}).strict();

export type CrearVentaDto = z.infer<typeof crearVentaSchema>;