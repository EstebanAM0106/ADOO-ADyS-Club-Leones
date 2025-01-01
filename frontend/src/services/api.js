import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Cambia según el entorno
});

// Agregar token automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Manejar errores globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Error en la API:", error);
        return Promise.reject(error);
    }
);

export default api;
