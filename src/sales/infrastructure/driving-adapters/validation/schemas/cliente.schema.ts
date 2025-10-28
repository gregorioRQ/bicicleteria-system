import { z } from 'zod';

export const crearClienteSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  dni: z.string().min(1, 'El DNI es requerido'),
  telefono: z.string().min(1, 'El teléfono es requerido')
}).strict(); // Rechaza campos adicionales

export const actualizarClienteSchema = z.object({
  nombre: z.string().min(1).optional(),
  dni: z.string().min(1).optional(),
  telefono: z.string().min(1).optional()
}).strict();

// Exporta el tipo inferido (opcional pero útil)
export type CrearClienteDto = z.infer<typeof crearClienteSchema>;
export type ActualizarClienteDto = z.infer<typeof actualizarClienteSchema>;