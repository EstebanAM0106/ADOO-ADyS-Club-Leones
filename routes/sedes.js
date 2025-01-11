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

// Obtener todas las sedes
router.get("/sedes", (req, res) => {
  const query = "SELECT * FROM Sede";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error obteniendo sedes:", err.message);
      return res
        .status(500)
        .json({ error: "Error al obtener sedes", details: err.message });
    }
    res.json(results);
  });
});

// Registrar una nueva sede
router.post(
  "/sedes",
  [
    body("Nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("Ubicacion")
      .optional()
      .isString()
      .withMessage("La ubicación debe ser una cadena de texto"),
  ],
  handleValidationErrors,
  (req, res) => {
    const { Nombre, Ubicacion } = req.body;
    const query = "INSERT INTO Sede (Nombre, Ubicacion) VALUES (?, ?)";
    db.query(query, [Nombre, Ubicacion], (err, results) => {
      if (err) {
        console.error("Error registrando sede:", err.message);
        return res
          .status(500)
          .json({ error: "Error al registrar sede", details: err.message });
      }
      res.json({
        message: "Sede registrada con éxito",
        id: results.insertId,
      });
    });
  }
);

// Eliminar una sede
router.delete(
  "/sedes/:id",
  [param("id").isInt().withMessage("El ID debe ser un número")],
  handleValidationErrors,
  (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Sede WHERE ID_Sede = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error eliminando sede:", err.message);
        return res
          .status(500)
          .json({ error: "Error al eliminar la sede", details: err.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Sede no encontrada" });
      }

      res.status(200).json({ message: "Sede eliminada con éxito" });
    });
  }
);

module.exports = router;
