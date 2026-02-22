require("dotenv").config();

const express = require("express");
const app = express();

const ticketsRoutes = require("./routes/tickets"); // importa las rutas de tickets desde el archivo correspondiente
const usersRoutes = require("./routes/users"); // importa las rutas de usuarios desde el archivo correspondiente

const PORT = process.env.PORT || 3000;

app.use(express.json());// middleware para parsear el cuerpo de las solicitudes como JSON

// Rutas principales
app.use("/tickets", ticketsRoutes); // usa las rutas de tickets para cualquier solicitud que comience con "/tickets"

app.use("/users", usersRoutes); // usa las rutas de usuarios para cualquier solicitud que comience con "/users"

app.get("/", (req, res) => {
  res.send("API running!");// ruta raíz para verificar que la API está funcionando
});

app.listen(PORT, () => { // inicia el servidor en el puerto especificado
  console.log(`Server is running on port ${PORT}`); // información de que el servidor está corriendo
});
