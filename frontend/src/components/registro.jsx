import React, { useState } from "react";
import axios from "../services/api";

const Registro = () => {
    const [evento, setEvento] = useState({
        Nombre: "",
        Fecha_Convocatoria: "",
        Fecha_Inicio_Inscripciones: "",
        Fecha_Cierre_Inscripciones: "",
        Fecha_Inicio: "",
        Fecha_Fin: "",
        Modalidad: "",
        Costo: "",
        Requisitos: "",
        Reglas: "",
        Horarios: "",
        ID_Sede: "",
    });

    const handleChange = (e) => {
        setEvento({
            ...evento,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!evento.Nombre || !evento.Fecha_Convocatoria || !evento.Fecha_Inicio_Inscripciones || !evento.Fecha_Cierre_Inscripciones || !evento.Fecha_Inicio || !evento.Fecha_Fin || !evento.Modalidad || !evento.Costo || !evento.ID_Sede) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await axios.post("/eventos", evento);
            alert("Evento registrado con éxito!");
            setEvento({ Nombre: "", Fecha_Convocatoria: "", Fecha_Inicio_Inscripciones: "", Fecha_Cierre_Inscripciones: "", Fecha_Inicio: "", Fecha_Fin: "", Modalidad: "", Costo: "", Requisitos: "", Reglas: "", Horarios: "", ID_Sede: "" }); // Resetear el formulario
        } catch (error) {
            console.error("Error registrando el evento:", error);
        }
    };

    return (
        <form className="form-registro" onSubmit={handleSubmit}>
            <h2>Registrar Evento</h2>
            <input
                type="text"
                name="Nombre"
                placeholder="Nombre del evento"
                value={evento.Nombre}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="Fecha_Convocatoria"
                value={evento.Fecha_Convocatoria}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="Fecha_Inicio_Inscripciones"
                value={evento.Fecha_Inicio_Inscripciones}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="Fecha_Cierre_Inscripciones"
                value={evento.Fecha_Cierre_Inscripciones}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="Fecha_Inicio"
                value={evento.Fecha_Inicio}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="Fecha_Fin"
                value={evento.Fecha_Fin}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="Modalidad"
                placeholder="Modalidad"
                value={evento.Modalidad}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="Costo"
                placeholder="Costo"
                value={evento.Costo}
                onChange={handleChange}
                required
            />
            <textarea
                name="Requisitos"
                placeholder="Requisitos"
                value={evento.Requisitos}
                onChange={handleChange}
            ></textarea>
            <textarea
                name="Reglas"
                placeholder="Reglas"
                value={evento.Reglas}
                onChange={handleChange}
            ></textarea>
            <textarea
                name="Horarios"
                placeholder="Horarios"
                value={evento.Horarios}
                onChange={handleChange}
            ></textarea>
            <input
                type="number"
                name="ID_Sede"
                placeholder="ID de la Sede"
                value={evento.ID_Sede}
                onChange={handleChange}
                required
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Registro;
