# -------------------------------
# ETAPA 1: Build
# -------------------------------
FROM node:20-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias de desarrollo (incluye TypeScript)
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar TypeScript a JavaScript (salida en /dist)
RUN npm run build


# -------------------------------
# ETAPA 2: Producción
# -------------------------------
FROM node:20-alpine

WORKDIR /app

# Copiar solo dependencias necesarias
COPY package*.json ./
RUN npm install --omit=dev

# Copiar los archivos compilados desde la etapa anterior
COPY --from=build /app/dist ./dist

# Copiar también el archivo .env si lo necesitás dentro del contenedor
# (no siempre es necesario porque docker-compose ya lo pasa)
# COPY .env .env

# Exponer el puerto de la app
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/server.js"]

