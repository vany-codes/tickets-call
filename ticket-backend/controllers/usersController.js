const pool = require("../db"); // importa la conexión a la base de datos desde el archivo correspondiente

const jwt = require("jsonwebtoken"); // importa jsonwebtoken para la generación de tokens de autenticación (aunque no se está utilizando en este código, es recomendable para la seguridad de las sesiones)
const bcrypt = require("bcrypt"); // importa bcrypt para el hashing de contraseñas (aunque no se está utilizando en este código, es recomendable para la seguridad de las contraseñas)

// GET all users
const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY id ASC"
    );
    res.json(result.rows); // envía la lista de usuarios como respuesta en formato JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, pass } = req.body;

    if (!name || !email || !pass) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    // 🔐 Hashear contraseña
    const saltRounds = 10; // número de rondas de sal para el hashing de la contraseña, lo que aumenta la seguridad al hacer que el proceso de hashing sea más lento y resistente a ataques
    const hashedPassword = await bcrypt.hash(pass, saltRounds); // genera un hash de la contraseña utilizando bcrypt, lo que mejora la seguridad al almacenar contraseñas en la base de datos, ya que el hash es irreversible y protege contra ataques de fuerza bruta

    const result = await pool.query(
      "INSERT INTO users (name, email, pass) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [name, email, hashedPassword] // inserta un nuevo usuario en la base de datos con el nombre, correo electrónico y contraseña hasheada, y devuelve el ID, nombre, correo electrónico y fecha de creación del nuevo usuario como respuesta en formato JSON
    );

    res.status(201).json(result.rows[0]); // envía el nuevo usuario creado como respuesta en formato JSON con un código de estado 201 (Created)
  } catch (error) {
    console.error("Error creating user:", error); // maneja cualquier error que ocurra durante la creación del usuario y envía una respuesta de error con un código de estado 500 (Internal Server Error)
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, pass } = req.body;

    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, pass = $3 WHERE id = $4 RETURNING *",
      [name, email, pass, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]); // envía el usuario actualizado como respuesta en formato JSON
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0]; // obtiene el usuario de la base de datos que coincide con el correo electrónico proporcionado en la solicitud de inicio de sesión

    // 🔐 Comparar contraseña
    const isMatch = await bcrypt.compare(pass, user.pass); // compara la contraseña proporcionada en la solicitud de inicio de sesión con la contraseña hasheada almacenada en la base de datos utilizando bcrypt, lo que mejora la seguridad al verificar las credenciales del usuario sin exponer la contraseña original

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 🎟 Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // genera un token de autenticación utilizando jsonwebtoken, que incluye el ID y correo electrónico del usuario como payload, y se firma con una clave secreta definida en las variables de entorno, con una expiración de 1 hora para mejorar la seguridad de la sesión del usuario
    );

    res.json({ message: "Login successful", token }); // envía un mensaje de éxito y el token de autenticación como respuesta en formato JSON, lo que permite al cliente utilizar el token para acceder a rutas protegidas en futuras solicitudes

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" }); // envía un mensaje de éxito como respuesta en formato JSON
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  userLogin,
  deleteUser,
};