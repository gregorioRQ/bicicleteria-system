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
4. Abre una línea de comandos y ejecuta los siguiente comandos:
(Asegúrate de tener docker ejecutándose en la pc)

````
docker compose up -d --build
````
5. Si deseas interactuar con la base de datos:
- Abre MySQL Workbench ve a Database > Connect to Database..
- En el menú de configuracion en el apartado "Port" pon el valor que le pusiste a "DB_PORT_HOST" en tu .env.
- Luego pon la contraseña que pusiste en el .env. tras presionar "ok".

6. Si por algún motivo la primera vez la app no arrancó y tuviste que cambiar los puertos corre los siguientes comandos en la raíz del proyecto para aplicar los cambios:
````
docker compose down
docker compose up -d --build
````

## Endpoints

### Coleccion en Postman
Puedes usar el enlace de abajo para acceder con mas detalle a la estructura de las consultas si tienes Postman en tu pc instalado.
 
````
https://gregorioq2025-5033720.postman.co/workspace/Rafa's-Workspace~e344a1ae-7c7e-4867-8c2d-2589b02a495c/collection/50145663-bc6eff48-8169-49d3-904a-2c50d689d8dc?action=share&source=copy-link&creator=50145663
````


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
- Items
  - registrar un ítem
<img src="/docs/assets/r-crear-item.png" alt="crear-item" width="500" height="400"/>

  - editar un ítem


- Servicios
  - registrar un servicio(reparacion)
<img src="/docs/assets/r-registrar-servicio-REPARACION.png" alt="crear-item" width="500" height="400"/>
  - registrar un servicio(chequeo)
<img src="/docs/assets/r-registrar-servicio-CHEQUEO.png" alt="crear-item" width="500" height="400"/>
  - editar un servicio(reparacion)
<img src="/docs/assets/r-editar-servicio.png" alt="crear-item" width="500" height="400"/>
  - editar un servicio(chequeo)
<img src="/docs/assets/r-actualizar-servicio.png" alt="crear-item" width="500" height="400"/>

- Ventas
  - registrar una venta
  <img src="/docs/assets/r-registrar-venta.png" alt="crear-item" width="500" height="400"/>

## Tecnologías usadas
- Javascript y TypeScript (lenguaje y tipado)
- Nodejs (entorno)
- Express (framework)
- MySQL (base de datos)
- Docker (despliegue)
- Git/Github (flujo de trabajo)
- Postman (pruebas de peticiones)
- VSCode (herramienta para el desarrollo)
- Arquitectura Hexagonal (ports and adapters)