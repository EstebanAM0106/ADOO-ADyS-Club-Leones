const express = require("express");
const { body, validationResult } = require("express-validator");
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
          return res
            .status(500)
            .json({
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

module.exports = router;
