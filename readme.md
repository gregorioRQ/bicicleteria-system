# Bicicleteria System

Sistema backend para una bicicletería que gestiona inventario, ventas y servicios. Implementado con TypeScript y Node.js siguiendo la arquitectura hexagonal (puertos y adaptadores). Pensado para ejecutarse dentro de un contenedor Docker.

## Características
- Gestión de inventario (items): listar, crear, actualizar stock, eliminar.
- Registro de servicios de mantenimiento (reparación, chequeo) con control de piezas usadas.
- Registro de ventas que pueden incluir servicios.
- Comunicación entre módulos mediante puertos/adapters.
- Gestión de los empleados.

## Requisitos
- Docker (para el despliegue)
- Git/Github (para clonar el repositorio)
- MySQL Workbench

## Instalación y ejecución
1. Clonar el repositorio del proyecto.
2. Configurar el archivo .env (usar como referencia al archivo .env.example)
3. Ve a la raíz del proyecto (donde se halla el archivo .env.example)
4. Ejecutar los siguiente comandos en una terminal:
(Asegurate de tener docker ejecutandose en la pc)

````
docker compose up -d --build
````
5. Si deseas interactuar con la base de datos:
- Abre MySQL Worckbench ve a Database > Connect to Database..
- En el menu de configuracion pon el puerto que pusiste en tu .env.
- Luego pon la contraseña que pusiste en el .env.

6. Si cambiaste los puertos corre los siguientes comandos:
````
docker compose down
docker compose up -d --build
````

## Endpoints
- Items (Inventory)
  - GET /api/items            -> listar ítems
  - GET /api/items/all        -> listar ítems (según rutas)
  - GET /api/items/:id        -> obtener por id
  - POST /api/items           -> crear ítem (body JSON)
  - DELETE /api/items/:id     -> eliminar ítem

- Maintenance (Servicios)
  - POST /api/maintenance     -> registrar servicio
  - PATCH /api/maintenance/:id/estado -> actualizar estado (ENTREGADO, etc.)
  - GET /api/maintenance/:id  -> obtener servicio por id
  - ... rutas adicionales en `ServiceRoutes.ts`
- Sales (Ventas)
  - POST /api/sales           -> registrar venta (incluye `servicios_ids`)
  - GET /api/sales/:id        -> obtener venta
  - DELETE /api/sales/:id     -> eliminar venta  

### Ejemplos del cuerpo de algunas peticiones
<p>
<img src="/docs/assets/r-crear-item.png" alt="crear-item" width="300" height="300"/>
</p>