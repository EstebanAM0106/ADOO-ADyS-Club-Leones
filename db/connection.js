const mysql = require("mysql2");
require("dotenv").config(); // Carga las variables del archivo .env

// Configuración de la conexión
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, // Puerto por defecto
});

// Probar la conexión
db.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err.message);
        process.exit(1);
    } else {
        console.log("Conexión exitosa a la base de datos MySQL");
    }
});

module.exports = db;
