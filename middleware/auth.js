const jwt = require("jsonwebtoken");

/**
 * Middleware para autenticar un token JWT.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 *
 * @example
 * // Uso en una ruta protegida
 * const express = require('express');
 * const app = express();
 * const authenticateToken = require('./middleware/auth');
 *
 * app.get('/ruta-protegida', authenticateToken, (req, res) => {
 *   res.send('Acceso concedido');
 * });
 *
 * @example
 * // Solicitud con token válido
 * fetch('/ruta-protegida', {
 *   method: 'GET',
 *   headers: {
 *     'Authorization': 'Bearer tu_token_valido'
 *   }
 * })
 * .then(response => response.json())
 * .then(data => console.log(data));
 *
 * @example
 * // Solicitud sin token
 * fetch('/ruta-protegida', {
 *   method: 'GET'
 * })
 * .then(response => response.json())
 * .then(data => console.log(data)); // { error: "Acceso denegado" }
 *
 * @example
 * // Solicitud con token inválido
 * fetch('/ruta-protegida', {
 *   method: 'GET',
 *   headers: {
 *     'Authorization': 'Bearer token_invalido'
 *   }
 * })
 * .then(response => response.json())
 * .then(data => console.log(data)); // { error: "Token no válido" }
 */
const authenticateToken = (req, res, next) => {
  console.log(req);
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("Error de Acceso");
    return res.status(401).json({ error: "Acceso denegado" });
  }

  const token = authHeader.replace("Bearer ", "");
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
