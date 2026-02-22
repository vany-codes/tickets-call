// Valida que los datos del usuario estén completos
const validateCreateUser = (req, res, next) => {
  const { name, email, pass } = req.body;

  if (!name || !email || !pass) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  next();
}

// Valida que los datos del usuario estén completos para iniciar sesión

const validateUserCredentials = (req, res, next) => {
  const { email, pass } = req.body;
    if (!email || !pass) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    next();
}

const validateId = (req, res, next) => {
  const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    next();
} 

// Exporta las funciones de validación para que puedan ser utilizadas en otras partes de la aplicación

module.exports = {
  validateCreateUser,
  validateUserCredentials,
  validateId,
};