import { z } from 'zod';

export const crearEmpleadoSchema = z.object({
  nombre: z.string().max(15, 'El nombre debe tener menos de 15 caracteres'),
  dni: z.string().min(1, 'El DNI es requerido'),
  telefono: z.string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .regex(/^\d+$/, 'El teléfono solo debe contener números'),
  rol: z.enum(["MECANICO","VENDEDOR"], { 
    error: () => ({ message: "Tipo de rol inválido" })
  })
}).strict();

export const actualizarEmpleadoSchema = z.object({
  nombre: z.string().min(1).optional(),
  dni: z.string().min(1).optional(),
  telefono: z.string().min(1).optional(),
  rol: z.enum(["MECANICO","VENDEDOR"], "Tipo de rol inválido")
}).strict();

// Exporta el tipo inferido (opcional pero útil)
export type CrearEmpleadoDto = z.infer<typeof crearEmpleadoSchema>;
export type ActualizarEmpleadoDto = z.infer<typeof actualizarEmpleadoSchema>;