"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
/**
 * Middleware para validar el cuerpo de
 * la solicitud usando un esquema Zod.
*/
const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
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
exports.validateSchema = validateSchema;
