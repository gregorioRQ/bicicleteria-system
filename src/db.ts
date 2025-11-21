import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`La variable de entorno ${key} no está definida`);
  }
  return value;
}

export const pool = mysql.createPool({
  host: getEnvVar('DB_HOST'),
  user: getEnvVar('DB_USER'),
  password: getEnvVar('DB_PASS'),
  database: getEnvVar('DB_NAME'),
  port: Number(getEnvVar('DB_PORT_HOST')),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
