const pool = require("../db"); // importa la conexión a la base de datos desde el archivo correspondiente

// GET all tickets
const getTickets = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tickets ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST create ticket
const createTicket = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "Title and description are required",
      });
    }

    // 🔥 Tomamos el user_id del token
    const userId = req.user.id;

    const result = await pool.query(
      "INSERT INTO tickets (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, status || "abierto", userId]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT update ticket
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      "UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE ticket
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tickets WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
};
