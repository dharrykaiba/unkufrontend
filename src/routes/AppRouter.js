// src/routes/AppRouter.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Test from "../pages/Test";

const NotFound = () => <h2>404 - Página no encontrada</h2>;

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<NotFound />} />  {/* Maneja rutas incorrectas */}
    </Routes>
  );
};

export default AppRouter;
