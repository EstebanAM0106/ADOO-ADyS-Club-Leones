const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const eventosRoutes = require("./routes/eventos");

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api", eventosRoutes);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
