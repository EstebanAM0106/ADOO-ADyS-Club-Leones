import React, { useEffect, useState } from "react";
import axios from "../services/api";

const ListaActividades = () => {
    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const response = await axios.get("/actividades");
                setActividades(response.data);
            } catch (error) {
                console.error("Error obteniendo actividades:", error);
            }
        };

        fetchActividades();
    }, []);

    const eliminarActividad = async (id) => {
        try {
            await axios.delete(`/actividades/${id}`);
            setActividades(actividades.filter((actividad) => actividad.id !== id));
            alert("Actividad eliminada con éxito");
        } catch (error) {
            console.error("Error eliminando actividad:", error);
        }
    };

    return (
        <div>
            <h2>Lista de Actividades</h2>
            <ul>
                {actividades.length > 0 ? (
                    actividades.map((actividad) => (
                        <li key={actividad.id}>
                            <h3>{actividad.nombre}</h3>
                            <p>{actividad.descripcion}</p>
                            <p>Fecha: {actividad.fecha}</p>
                            <button onClick={() => eliminarActividad(actividad.id)}>Eliminar</button>
                        </li>
                    ))
                ) : (
                    <p>No hay actividades registradas.</p>
                )}
            </ul>
        </div>
    );
};

export default ListaActividades;
