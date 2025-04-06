import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail"; // Página de detalle del producto
import About from "../pages/About";
import Profile from "../pages/Profile";
import ProfileEdit from "../pages/ProfileEdit";
import ChangePassword from "../pages/ChangePassword";
import UpdateData from "../pages/UpdateData.js";
import NotFound from "../pages/NotFound";
import Search from "../pages/Search.js";
import ProtectedRoute from "./ProtectedRoute";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:prdId" element={<ProductDetail />} />{" "}
      {/* Ruta dinámica */}
      <Route path="/search" element={<Search />} />
      <Route path="/about" element={<About />} />
      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/update-data" element={<UpdateData />} />
      </Route>
      {/* Ruta para la página de error 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
