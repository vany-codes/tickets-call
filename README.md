# 📦 Proyecto: Ticket Backend API

## 🛠 Tecnologías usadas

- Node.js

- Express

- PostgreSQL

- pg (node-postgres)

- dotenv

- nodemon

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

# 📡 Endpoints creados
- GET /tickets

- Obtiene todos los tickets.

- POST /tickets

- Crea un nuevo ticket.

- PUT /tickets/:id

- Actualiza el estado de un ticket.

- DELETE /tickets/:id

- Elimina un ticket.
