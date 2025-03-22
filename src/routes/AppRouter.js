import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";


const AppRouter = () => {
  return (
    <Routes>
      <p>Router</p>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
