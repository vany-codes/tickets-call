require("dotenv").config();

const express = require("express");
const app = express();

const ticketsRoutes = require("./routes/tickets");

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas principales
app.use("/tickets", ticketsRoutes);

app.get("/", (req, res) => {
  res.send("API running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
