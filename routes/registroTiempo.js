const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const db = require("../db/connection");

// Middleware para manejar validaciones
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Obtener todos los registros de tiempo
router.get("/registrotiempo", (req, res) => {
  const query = `
    SELECT RegistroTiempo.*, Evento.Nombre AS EventoNombre, Usuarios.Email AS UsuarioEmail
    FROM RegistroTiempo
    INNER JOIN Evento ON RegistroTiempo.ID_Evento = Evento.ID_Evento
    INNER JOIN Usuarios ON RegistroTiempo.ID_Usuario = Usuarios.ID_Usuario
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error obteniendo registros de tiempo:", err.message);
      return res
        .status(500)
        .json({
          error: "Error al obtener registros de tiempo",
          details: err.message,
        });
    }
    res.json(results);
  });
});

// Registrar un nuevo tiempo
router.post(
  "/registrotiempo",
  [
    body("ID_Evento")
      .isInt()
      .withMessage("El ID del evento debe ser un número"),
    body("ID_Usuario")
      .isInt()
      .withMessage("El ID del usuario debe ser un número"),
    body("Tiempo")
      .isString()
      .withMessage(
        "El tiempo debe ser una cadena de texto en formato HH:MM:SS"
      ),
  ],
  handleValidationErrors,
  (req, res) => {
    const { ID_Evento, ID_Usuario, Tiempo } = req.body;
    const query =
      "INSERT INTO RegistroTiempo (ID_Evento, ID_Usuario, Tiempo) VALUES (?, ?, ?)";
    db.query(query, [ID_Evento, ID_Usuario, Tiempo], (err, results) => {
      if (err) {
        console.error("Error registrando tiempo:", err.message);
        return res
          .status(500)
          .json({ error: "Error al registrar tiempo", details: err.message });
      }
      res.json({
        message: "Tiempo registrado con éxito",
        id: results.insertId,
      });
    });
  }
);

// Eliminar un registro de tiempo
router.delete(
  "/registrotiempo/:id",
  [param("id").isInt().withMessage("El ID debe ser un número")],
  handleValidationErrors,
  (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM RegistroTiempo WHERE ID_Registro = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error eliminando registro de tiempo:", err.message);
        return res
          .status(500)
          .json({
            error: "Error al eliminar el registro de tiempo",
            details: err.message,
          });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Registro de tiempo no encontrado" });
      }

      res
        .status(200)
        .json({ message: "Registro de tiempo eliminado con éxito" });
    });
  }
);

module.exports = router;
