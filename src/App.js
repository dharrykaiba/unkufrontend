// src/App.js
import React from "react";
import { HashRouter as Router } from "react-router-dom";

import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./App.css"; // Tus estilos globales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <AppRouter />
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
