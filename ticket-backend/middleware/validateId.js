const validateId = (req, res, next) => {
  const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    next();
}

module.exports = validateId;