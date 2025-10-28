import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

/**
 * Middleware para validar el cuerpo de
 * la solicitud usando un esquema Zod.
*/

export const validateSchema = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Datos inválidos',
          detalles: error.issues.map(err => ({
            campo: err.path.join('.'),
            mensaje: err.message
          }))
        });
      }
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
};