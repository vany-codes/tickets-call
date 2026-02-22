const express = require("express"); // importa el módulo de Express para crear rutas y manejar solicitudes HTTP
const router = express.Router(); // crea un enrutador de Express para definir las rutas relacionadas con los tickets

const authMiddleware = require("../middleware/auth.js"); // importa el middleware de protección para asegurar que solo los usuarios autenticados puedan acceder a ciertas rutas

const {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketsController.js"); // importa las funciones del controlador de tickets para manejar las solicitudes

const validateId = require("../middleware/validateId.js"); // importa el middleware para validar el ID de los tickets

console.log(updateTicket);

router.get("/", authMiddleware, getTickets); // ruta para obtener todos los tickets
router.post("/", authMiddleware, createTicket); // ruta para crear un nuevo ticket
router.put("/:id", authMiddleware, validateId, updateTicket); // ruta para actualizar un ticket existente, el ID del ticket se pasa como parámetro en la URL
router.delete("/:id", authMiddleware, validateId, deleteTicket); // ruta para eliminar un ticket, el ID del ticket se pasa como parámetro en la URL

module.exports = router;
