import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registro from "./components/registro";
import ListaActividades from "./components/ListaActividades";

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<ListaActividades />} />
            <Route path="/registro" element={<Registro />} />
        </Routes>
    </Router>
);

export default App;
