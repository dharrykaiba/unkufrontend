// src/routes/AppRouter.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import Test from "../pages/Test";

function About() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const variable = queryParams.get("variable") || "No definida";

  return (
    <div>
      <h1>Acerca de</h1>
      <p>Variable desde la URL: {variable}</p>
    </div>
  );
}

const NotFound = () => <h2>404 - Página no encontrada</h2>;

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />  {/* Maneja rutas incorrectas */}
      </Routes>

  );
};

export default AppRouter;
