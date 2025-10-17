import dotenv from "dotenv";
import app from "./app.js"; // Importa la configuración de la aplicación desde app.ts

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
