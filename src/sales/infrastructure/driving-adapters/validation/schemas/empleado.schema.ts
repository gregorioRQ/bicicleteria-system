import { z } from 'zod';

export const crearEmpleadoSchema = z.object({
  nombre: z.string("Debe ser una cadena de caracteres").max(15, 'El nombre debe tener menos de 15 caracteres'),
  dni: z.string("Debe ser una cadena de caracteres").min(1, 'El DNI es requerido').max(20, "Debe tener menos de 20 caracteres").regex(/^\d+$/, 'Solo debe contener números'),
  telefono: z.string("Debe ser una cadena de caracteres").min(8, 'Debe tener al menos 8 dígitos').max(30, "Máximo 30 digitos")
    .regex(/^\d+$/, 'Solo debe contener números'),
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