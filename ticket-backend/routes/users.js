const express = require("express"); // importa el módulo de Express para crear la aplicación y manejar solicitudes HTTP
const router = express.Router(); // crea un enrutador de Express para definir las rutas relacionadas con los tickets

const authMiddleware = require("../middleware/auth.js"); // importa el middleware de protección para asegurar que solo los usuarios autenticados puedan acceder a ciertas rutas

const {
  getUsers,
  createUser,
  updateUser,
  userLogin,
  deleteUser,
} = require("../controllers/usersController.js"); // importa las funciones del controlador de usuarios para manejar las solicitudes
const {
  validateCreateUser,
  validateUserCredentials,
  validateId,
} = require("../middleware/validateus.js"); // importa el middleware para validar los datos de los usuarios

router.get("/", getUsers); // ruta para obtener todos los usuarios
router.post("/", validateCreateUser, createUser); // ruta para crear un nuevo usuario
router.put("/:id", authMiddleware, validateId, updateUser); // ruta para actualizar un usuario existente, el ID del usuario se pasa como parámetro en la URL
router.post("/login", validateUserCredentials, userLogin); // ruta para iniciar sesión, se espera que el correo electrónico y la contraseña se envíen en el cuerpo de la solicitud
router.delete("/:id", authMiddleware, validateId, deleteUser); // ruta para eliminar un usuario, el ID del usuario se pasa como parámetro en la URL

module.exports = router; // exporta el enrutador para que pueda ser utilizado en otros archivos, como index.js