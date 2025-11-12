import { z } from "zod";

export const crearItemSchema = z.object({
    nombre: z.string("Debe ser una cadena de caracteres").max(30, "Debe tener menos de 30 caracteres"),
    marca: z.string("Debe ser una cadena de caracteres").max(30, "Debe tener menos de 30 caracteres"),
    precioCompra: z.number("Debe ser un número").positive("El precio de compra debe ser un número positivo").max(9000000, "valor muy elevado"),
    precioVenta: z.number("Debe ser un número").positive("El precio de compra debe ser un número positivo").max(9000000, "valor muy elevado"),
    stock: z.number("Debe ser un número").nonnegative("No puede ser un número negativo").max(40, "Valor muy elevado").int("Debe ser un número entero").min(1, "Campo requerido"),
    fechaIngreso: z.date().optional()
}).strict();

export const actualizarStockSchema = z.object({
    id: z.number("Debe ser un número").nonnegative("No puede ser un número negativo").int("Solo se pueden ingresar enteros").max(9999999, "Valor muy elevado").min(1, "Campo requerido"),
    cantidad: z.number("Debe ser un número").nonnegative("No puede ser un número negativo").int("Solo se pueden ingresar enteros").max(30, "Valor muy elevado").min(1, "Campo requerido"),
})