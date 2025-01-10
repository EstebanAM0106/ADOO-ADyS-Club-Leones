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

// Obtener todas las inscripciones
router.get("/inscripciones", (req, res) => {
  const query = `
    SELECT Inscripcion.*, Evento.Nombre AS EventoNombre, Usuarios.Email AS UsuarioEmail
    FROM Inscripcion
    INNER JOIN Evento ON Inscripcion.ID_Evento = Evento.ID_Evento
    INNER JOIN Usuarios ON Inscripcion.ID_Usuario = Usuarios.ID_Usuario
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error obteniendo inscripciones:", err.message);
      return res
        .status(500)
        .json({
          error: "Error al obtener inscripciones",
          details: err.message,
        });
    }
    res.json(results);
  });
});

// Registrar una nueva inscripción
router.post(
  "/inscripciones",
  [
    body("ID_Evento")
      .isInt()
      .withMessage("El ID del evento debe ser un número"),
    body("ID_Usuario")
      .isInt()
      .withMessage("El ID del usuario debe ser un número"),
    body("Fecha_Inscripcion")
      .isDate()
      .withMessage("La fecha de inscripción debe ser válida"),
    body("Nombre_Inscripcion")
      .notEmpty()
      .withMessage("El nombre de inscripción es obligatorio"),
  ],
  handleValidationErrors,
  (req, res) => {
    const { ID_Evento, ID_Usuario, Fecha_Inscripcion, Nombre_Inscripcion } =
      req.body;
    const query =
      "INSERT INTO Inscripcion (ID_Evento, ID_Usuario, Fecha_Inscripcion, Nombre_Inscripcion) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [ID_Evento, ID_Usuario, Fecha_Inscripcion, Nombre_Inscripcion],
      (err, results) => {
        if (err) {
          console.error("Error registrando inscripción:", err.message);
          return res.status(500).json({
            error: "Error al registrar inscripción",
            details: err.message,
          });
        }
        res.json({
          message: "Inscripción registrada con éxito",
          id: results.insertId,
        });
      }
    );
  }
);

// Eliminar una inscripción
router.delete(
  "/inscripciones/:id",
  [param("id").isInt().withMessage("El ID debe ser un número")],
  handleValidationErrors,
  (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Inscripcion WHERE ID_Inscripcion = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error eliminando inscripción:", err.message);
        return res
          .status(500)
          .json({
            error: "Error al eliminar la inscripción",
            details: err.message,
          });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Inscripción no encontrada" });
      }

      res.status(200).json({ message: "Inscripción eliminada con éxito" });
    });
  }
);

module.exports = router;
