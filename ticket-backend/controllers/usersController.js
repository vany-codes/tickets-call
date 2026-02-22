const pool = require("../db"); // importa la conexión a la base de datos desde el archivo correspondiente

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
        const result = await pool.query(
        "INSERT INTO users (name, email, pass) VALUES ($1, $2, $3) RETURNING *",
        [name, email, pass]
    );

    res.status(201).json(result.rows[0]); // envía el usuario creado como respuesta en formato JSON con un código de estado 201 (Created)
  } catch (error) {
    console.error("Error creating user:", error);
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
      "SELECT * FROM users WHERE email = $1 AND pass = $2",
      [email, pass]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user: result.rows[0] }); // envía un mensaje de éxito y el usuario autenticado como respuesta en formato JSON
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