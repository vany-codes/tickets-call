const express = require("express");
const router = express.Router();

const {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketsController");

router.get("/", getTickets);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
