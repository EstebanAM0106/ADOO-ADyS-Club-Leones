const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const eventosRoutes = require("./routes/eventos");
const authRoutes = require("./routes/auth"); // Importa las rutas de autenticación

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api", eventosRoutes);
app.use("/api", authRoutes); // Usa las rutas de autenticación

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
