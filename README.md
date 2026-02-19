# 📦 Proyecto: Ticket Backend API

## 🛠 Tecnologías usadas

- Node.js

- Express

- PostgreSQL

- pg (node-postgres)

- dotenv

- nodemon

## Descripción

Esta aplicación proporciona una API RESTful para gestionar tickets. Permite crear, leer, actualizar y eliminar tickets en una base de datos PostgreSQL.

# 🚀 Instalación del Proyecto
## 1️⃣ Crear proyecto

```
npm init -y
```

## 2️⃣ Instalar dependencias

```
npm install express cors dotenv pg
npm install --save-dev nodemon

```

## 3️⃣ Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
PORT=3000
```

# 3️⃣ Crear base de datos

```
CREATE DATABASE tickets_app;

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'abierto',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Uso

Para ejecutar el servidor en modo desarrollo:
```
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`.

## Endpoints de la API

### GET /tickets
Obtiene todos los tickets.

### POST /tickets
Crea un nuevo ticket. Requiere un body JSON con `title` y `description`.

Ejemplo:
```json
{
  "title": "Nuevo ticket",
  "description": "Descripción del ticket"
}
```

### PUT /tickets/:id
Actualiza el estado de un ticket. Requiere un body JSON con `status`.

Ejemplo:
```json
{
  "status": "closed"
}
```

### DELETE /tickets/id
Elimina un ticket por su ID.

## Dependencias

- Express: Framework web para Node.js
- pg: Cliente PostgreSQL para Node.js
- cors: Middleware para habilitar CORS
- dotenv: Carga variables de entorno desde un archivo .env
- nodemon: Herramienta para reiniciar automáticamente el servidor durante el desarrollo

## Licencia

ISC
