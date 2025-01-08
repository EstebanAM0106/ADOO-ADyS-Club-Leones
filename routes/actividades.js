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

// Obtener todas las actividades (excluyendo las eliminadas)
router.get("/actividades", (req, res) => {
  const query = `
        SELECT actividades.*, usuarios.nombre AS usuario
        FROM actividades
        INNER JOIN usuarios ON actividades.usuario_id = usuarios.id
        WHERE actividades.is_deleted = FALSE
    `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error obteniendo actividades:", err.message);
      return res.status(500).json({ error: "Error al obtener actividades" });
    }
    res.json(results);
  });
});

// Registrar una nueva actividad
router.post(
  "/actividades",
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
    body("fecha").isDate().withMessage("La fecha debe ser válida"),
    body("usuario_id").isInt().withMessage("El usuario_id debe ser un número"),
  ],
  handleValidationErrors,
  (req, res) => {
    const { nombre, descripcion, fecha, usuario_id } = req.body;
    const query =
      "INSERT INTO actividades (nombre, descripcion, fecha, usuario_id) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [nombre, descripcion, fecha, usuario_id],
      (err, results) => {
        if (err) {
          console.error("Error registrando actividad:", err.message);
          return res
            .status(500)
            .json({ error: "Error al registrar actividad" });
        }
        res.json({
          message: "Actividad registrada con éxito",
          id: results.insertId,
        });
      }
    );
  }
);

// Eliminar una actividad (soft delete)
router.delete(
  "/actividades/:id",
  [param("id").isInt().withMessage("El ID debe ser un número")],
  handleValidationErrors,
  (req, res) => {
    const { id } = req.params;
    const query = "UPDATE actividades SET is_deleted = TRUE WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error marcando actividad como eliminada:", err.message);
        return res
          .status(500)
          .json({ error: "Error al eliminar la actividad" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Actividad no encontrada" });
      }

      res.status(200).json({ message: "Actividad eliminada con éxito" });
    });
  }
);

module.exports = router;
