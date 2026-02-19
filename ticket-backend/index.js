const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./db'); // Importa el pool de conexiones a la base de datos

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('API running!');
});

pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Database connected:', result.rows[0]);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/tickets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tickets");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/tickets", async (req, res) => {
    try {
        const { title, description } = req.body;

        const result = await pool.query(
            "INSERT INTO tickets (title, description) VALUES ($1, $2) RETURNING *",
            [title, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/tickets/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const result = await pool.query(
            "UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );

        if (result.rows.length === 0) { // No se encontró el ticket con el ID proporcionado
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.json(result.rows[0]); // Devuelve el ticket actualizado
    } catch (error) {
        console.error("Error updating ticket:", error); // Log del error para diagnóstico
        res.status(500).json({ error: "Internal server error" }); // Respuesta genérica para el cliente, evitando exponer detalles del error
    }
});

app.delete("/tickets/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query("DELETE FROM tickets WHERE id = $1", [id]);
            res.json({ message: "Ticket deleted successfully" }); // Respuesta de éxito, incluso si el ticket no existía, para evitar exponer información sobre la existencia del ticket
    } catch (error) {
        console.error("Error deleting ticket:", error); // Log del error para diagnóstico
        res.status(500).json({ error: "Internal server error" }); // Respuesta genérica para el cliente, evitando exponer detalles del error
    }
});