const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  try {
    const verified = jwt.verify(token, "secret_key");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token no válido" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para realizar esta acción" });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
