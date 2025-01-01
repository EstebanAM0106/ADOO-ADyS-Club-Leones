import React, { useState } from "react";
import axios from "../services/api";

const Login = () => {
    const [credenciales, setCredenciales] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", credenciales);
            localStorage.setItem("token", response.data.token); // Guardar el token en localStorage
            alert("Inicio de sesión exitoso");
        } catch (error) {
            console.error("Error iniciando sesión:", error);
            alert("Error de autenticación. Verifica tus credenciales.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={credenciales.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={credenciales.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default Login;
