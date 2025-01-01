import React, { useState } from "react";
import axios from "../services/api";

const Registro = () => {
    const [actividad, setActividad] = useState({
        nombre: "",
        descripcion: "",
        fecha: "",
    });

    const handleChange = (e) => {
        setActividad({
            ...actividad,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!actividad.nombre || !actividad.descripcion || !actividad.fecha) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await axios.post("/actividades", actividad);
            alert("Actividad registrada con éxito!");
            setActividad({ nombre: "", descripcion: "", fecha: "" }); // Resetear el formulario
        } catch (error) {
            console.error("Error registrando la actividad:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar Actividad Deportiva</h2>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre de la actividad"
                value={actividad.nombre}
                onChange={handleChange}
                required
            />
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={actividad.descripcion}
                onChange={handleChange}
                required
            ></textarea>
            <input
                type="date"
                name="fecha"
                value={actividad.fecha}
                onChange={handleChange}
                required
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Registro;
