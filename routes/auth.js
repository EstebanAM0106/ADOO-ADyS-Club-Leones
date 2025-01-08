const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const db = require("../db/connection");

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("El email debe ser válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const query = "SELECT * FROM Usuarios WHERE Email = ? AND Password = ?";
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error("Error en la autenticación:", err.message);
        return res.status(500).json({ error: "Error en la autenticación" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }

      const user = results[0];
      /**
       * Genera un token JWT para un usuario autenticado.
       *
       * @param {Object} user - Objeto que contiene la información del usuario.
       * @param {number} user.ID_Usuario - ID del usuario.
       * @param {string} user.Email - Correo electrónico del usuario.
       * @param {string} user.Rol - Rol del usuario.
       * @returns {string} Token JWT generado.
       *
       * @example
       * const user = {
       *   ID_Usuario: 123,
       *   Email: "usuario@example.com",
       *   Rol: "admin"
       * };
       * const token = jwt.sign(
       *   { id: user.ID_Usuario, email: user.Email, role: user.Rol },
       *   "secret_key",
       *   { expiresIn: "1h" }
       * );
       * console.log(token); // Imprime el token JWT generado
       */
      const token = jwt.sign(
        { id: user.ID_Usuario, email: user.Email, role: user.Rol },
        "secret_key",
        { expiresIn: "1h" }
      );

      res.json({
        token,
        user: {
          email: user.Email,
          password: user.Password,
          role: user.Rol,
        },
      });
    });
  }
);

module.exports = router;
