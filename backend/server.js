const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const actividadesRoutes = require("./routes/actividades");

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api", actividadesRoutes);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
