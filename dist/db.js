"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnvVar(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`La variable de entorno ${key} no está definida`);
    }
    return value;
}
exports.pool = promise_1.default.createPool({
    host: getEnvVar('DB_HOST'),
    user: getEnvVar('DB_USER'),
    password: getEnvVar('DB_PASS'),
    database: getEnvVar('DB_NAME'),
    port: Number(getEnvVar('DB_PORT')),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
