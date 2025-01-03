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
        const query = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
        db.query(query, [email, password], (err, results) => {
            if (err) {
                console.error("Error en la autenticación:", err.message);
                return res.status(500).json({ error: "Error en la autenticación" });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: "Credenciales incorrectas" });
            }

            const user = results[0];
            const token = jwt.sign({ id: user.id, email: user.email }, "secret_key", { expiresIn: "1h" });
            res.json({ token });
        });
    }
);

module.exports = router;