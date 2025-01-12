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

// Obtener todos los usuarios
router.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM Usuarios";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error obteniendo usuarios:", err.message);
      return res
        .status(500)
        .json({ error: "Error al obtener usuarios", details: err.message });
    }
    res.json(results);
  });
});

// Obtener un usuario por ID
router.get(
  "/usuarios/:id",
  [param("id").isInt().withMessage("El ID debe ser un número").toInt()],
  handleValidationErrors,
  (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM Usuarios WHERE ID_Usuario = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error obteniendo usuario:", err.message);
        return res.status(500).json({
          error: "Error al obtener usuario",
          details: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.json(results[0]);
    });
  }
);

// Registrar un nuevo usuario
router.post(
  "/usuarios",
  [
    body("Nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("Apellido").notEmpty().withMessage("El apellido es obligatorio"),
    body("Genero")
      .isIn(["masculino", "femenino", "otro"])
      .withMessage("El género debe ser 'masculino', 'femenino' o 'otro'"),
    body("Fecha_Nacimiento")
      .optional()
      .isDate()
      .withMessage("La fecha de nacimiento debe ser válida"),
    body("Email").isEmail().withMessage("El email debe ser válido"),
    body("Password").notEmpty().withMessage("La contraseña es obligatoria"),
    body("Rol")
      .isIn(["user", "admin"])
      .withMessage("El rol debe ser 'user' o 'admin'"),
  ],
  handleValidationErrors,
  (req, res) => {
    const { Nombre, Apellido, Genero, Fecha_Nacimiento, Email, Password, Rol } =
      req.body;
    const query =
      "INSERT INTO Usuarios (Nombre, Apellido, Genero, Fecha_Nacimiento, Email, Password, Rol) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [Nombre, Apellido, Genero, Fecha_Nacimiento, Email, Password, Rol],
      (err, results) => {
        if (err) {
          console.error("Error registrando usuario:", err.message);
          return res.status(500).json({
            error: "Error al registrar usuario",
            details: err.message,
          });
        }
        res.json({
          message: "Usuario registrado con éxito",
          id: results.insertId,
        });
      }
    );
  }
);

// Eliminar un usuario
router.delete(
  "/usuarios/:id",
  [param("id").isInt().withMessage("El ID debe ser un número")],
  handleValidationErrors,
  (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Usuarios WHERE ID_Usuario = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error eliminando usuario:", err.message);
        return res.status(500).json({
          error: "Error al eliminar el usuario",
          details: err.message,
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.status(200).json({ message: "Usuario eliminado con éxito" });
    });
  }
);

module.exports = router;
