const { Pool } = require('pg'); // Importa el módulo 'pg' para manejar la conexión a PostgreSQL
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// Configura la conexión a la base de datos utilizando las variables de entorno

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool; // Exporta el pool de conexiones para ser utilizado en otros archivos

/*API REST con:

Auth

Hashing

JWT

Foreign Keys

Middleware

Arquitectura separada

Eso ya se pone en CV.*/