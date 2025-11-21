import dotenv from 'dotenv';

// Cargar variables de entorno de prueba ANTES de importar db.ts
dotenv.config({ path: '.env.test' });

// Asegurar que se usen las variables de prueba
process.env.NODE_ENV = 'test';