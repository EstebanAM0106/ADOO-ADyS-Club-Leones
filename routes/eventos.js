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

// Obtener todos los eventos
router.get("/eventos", (req, res) => {
    const query = `
        SELECT Evento.*, Sede.Nombre AS SedeNombre
        FROM Evento
        INNER JOIN Sede ON Evento.ID_Sede = Sede.ID_Sede
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error obteniendo eventos:", err.message);
            return res.status(500).json({ error: "Error al obtener eventos", details: err.message });
        }
        res.json(results);
    });
});

// Registrar un nuevo evento
router.post(
    "/eventos",
    [
        body("Nombre").notEmpty().withMessage("El nombre es obligatorio"),
        body("Fecha_Convocatoria").isDate().withMessage("La fecha de convocatoria debe ser válida"),
        body("Fecha_Inicio_Inscripciones").isDate().withMessage("La fecha de inicio de inscripciones debe ser válida"),
        body("Fecha_Cierre_Inscripciones").isDate().withMessage("La fecha de cierre de inscripciones debe ser válida"),
        body("Fecha_Inicio").isDate().withMessage("La fecha de inicio debe ser válida"),
        body("Fecha_Fin").isDate().withMessage("La fecha de fin debe ser válida"),
        body("Modalidad").notEmpty().withMessage("La modalidad es obligatoria"),
        body("Costo").isDecimal().withMessage("El costo debe ser un número decimal"),
        body("ID_Sede").isInt().withMessage("El ID de la sede debe ser un número"),
    ],
    handleValidationErrors,
    (req, res) => {
        const { Nombre, Fecha_Convocatoria, Fecha_Inicio_Inscripciones, Fecha_Cierre_Inscripciones, Fecha_Inicio, Fecha_Fin, Modalidad, Costo, Requisitos, Reglas, Horarios, ID_Sede } = req.body;
        const query = "INSERT INTO Evento (Nombre, Fecha_Convocatoria, Fecha_Inicio_Inscripciones, Fecha_Cierre_Inscripciones, Fecha_Inicio, Fecha_Fin, Modalidad, Costo, Requisitos, Reglas, Horarios, ID_Sede) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(query, [Nombre, Fecha_Convocatoria, Fecha_Inicio_Inscripciones, Fecha_Cierre_Inscripciones, Fecha_Inicio, Fecha_Fin, Modalidad, Costo, Requisitos, Reglas, Horarios, ID_Sede], (err, results) => {
            if (err) {
                console.error("Error registrando evento:", err.message);
                return res.status(500).json({ error: "Error al registrar evento", details: err.message });
            }
            res.json({ message: "Evento registrado con éxito", id: results.insertId });
        });
    }
);

// Actualizar un evento existente
router.put(
    "/eventos/:id",
    [
        param("id").isInt().withMessage("El ID debe ser un número"),
        body("Nombre").notEmpty().withMessage("El nombre es obligatorio"),
        body("Fecha_Convocatoria").isDate().withMessage("La fecha de convocatoria debe ser válida"),
        body("Fecha_Inicio_Inscripciones").isDate().withMessage("La fecha de inicio de inscripciones debe ser válida"),
        body("Fecha_Cierre_Inscripciones").isDate().withMessage("La fecha de cierre de inscripciones debe ser válida"),
        body("Fecha_Inicio").isDate().withMessage("La fecha de inicio debe ser válida"),
        body("Fecha_Fin").isDate().withMessage("La fecha de fin debe ser válida"),
        body("Modalidad").notEmpty().withMessage("La modalidad es obligatoria"),
        body("Costo").isDecimal().withMessage("El costo debe ser un número decimal"),
        body("ID_Sede").isInt().withMessage("El ID de la sede debe ser un número"),
    ],
    handleValidationErrors,
    (req, res) => {
        const { id } = req.params;
        const { Nombre, Fecha_Convocatoria, Fecha_Inicio_Inscripciones, Fecha_Cierre_Inscripciones, Fecha_Inicio, Fecha_Fin, Modalidad, Costo, Requisitos, Reglas, Horarios, ID_Sede } = req.body;
        const query = "UPDATE Evento SET Nombre = ?, Fecha_Convocatoria = ?, Fecha_Inicio_Inscripciones = ?, Fecha_Cierre_Inscripciones = ?, Fecha_Inicio = ?, Fecha_Fin = ?, Modalidad = ?, Costo = ?, Requisitos = ?, Reglas = ?, Horarios = ?, ID_Sede = ? WHERE ID_Evento = ?";
        db.query(query, [Nombre, Fecha_Convocatoria, Fecha_Inicio_Inscripciones, Fecha_Cierre_Inscripciones, Fecha_Inicio, Fecha_Fin, Modalidad, Costo, Requisitos, Reglas, Horarios, ID_Sede, id], (err, results) => {
            if (err) {
                console.error("Error actualizando evento:", err.message);
                return res.status(500).json({ error: "Error al actualizar evento", details: err.message });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "Evento no encontrado" });
            }

            res.status(200).json({ message: "Evento actualizado con éxito" });
        });
    }
);

// Eliminar un evento
router.delete(
    "/eventos/:id",
    [
        param("id").isInt().withMessage("El ID debe ser un número"),
    ],
    handleValidationErrors,
    (req, res) => {
        const { id } = req.params;
        const query = "DELETE FROM Evento WHERE ID_Evento = ?";
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error("Error eliminando evento:", err.message);
                return res.status(500).json({ error: "Error al eliminar el evento", details: err.message });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "Evento no encontrado" });
            }

            res.status(200).json({ message: "Evento eliminado con éxito" });
        });
    }
);

module.exports = router;