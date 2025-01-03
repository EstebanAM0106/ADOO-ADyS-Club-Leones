import React, { useEffect, useState } from "react";
import axios from "../services/api";

const ListaActividades = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get("/eventos");
                setEventos(response.data);
            } catch (error) {
                console.error("Error obteniendo eventos:", error);
            }
        };

        fetchEventos();
    }, []);

    const eliminarEvento = async (id) => {
        try {
            await axios.delete(`/eventos/${id}`);
            setEventos(eventos.filter((evento) => evento.ID_Evento !== id));
            alert("Evento eliminado con éxito");
        } catch (error) {
            console.error("Error eliminando evento:", error);
        }
    };

    return (
        <div className="lista-eventos">
            <h2>Lista de Eventos</h2>
            <ul>
                {eventos.length > 0 ? (
                    eventos.map((evento) => (
                        <li key={evento.ID_Evento}>
                            <h3>{evento.Nombre}</h3>
                            <p>Fecha de Convocatoria: {evento.Fecha_Convocatoria}</p>
                            <p>Fecha de Inicio: {evento.Fecha_Inicio}</p>
                            <p>Fecha de Fin: {evento.Fecha_Fin}</p>
                            <p>Modalidad: {evento.Modalidad}</p>
                            <p>Costo: {evento.Costo}</p>
                            <p>Sede: {evento.SedeNombre}</p>
                            <button onClick={() => eliminarEvento(evento.ID_Evento)}>Eliminar</button>
                        </li>
                    ))
                ) : (
                    <p>No hay eventos registrados.</p>
                )}
            </ul>
        </div>
    );
};

export default ListaActividades;
