const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
/**
 * Importa las rutas de eventos desde el archivo "./routes/eventos".
 *
 * @example
 * const eventosRoutes = require("./routes/eventos");
 *
 * @module eventosRoutes
 */
const eventosRoutes = require("./routes/eventos");
const authRoutes = require("./routes/auth"); // Importa las rutas de autenticación
const inscripcionesRoutes = require("./routes/inscripciones"); // Importa las rutas de inscripciones
const usuariosRoutes = require("./routes/usuarios"); // Importa las rutas de usuarios
const sedesRoutes = require("./routes/sedes"); // Importa las rutas de sedes
const registroTiempoRoutes = require("./routes/registroTiempo"); // Importa las rutas de registro de tiempo

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api", eventosRoutes);
app.use("/api", authRoutes); // Usa las rutas de autenticación
app.use("/api", inscripcionesRoutes); // Usa las rutas de inscripciones
app.use("/api", usuariosRoutes); // Usa las rutas de usuarios
app.use("/api", sedesRoutes); // Usa las rutas de sedes
app.use("/api", registroTiempoRoutes); // Usa las rutas de registro de tiempo

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
