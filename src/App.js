import React from "react";
/*
import { HashRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
*/
import "./App.css"; // Mantener estilos globales

import UnderConstruction from "./pages/UnderConstruction";

function App() {
  return (
    <>
      {
        /*
        <Router>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <AppRouter />
              <Footer />
            </CartProvider>
          </AuthProvider>
        </Router>
         */
      }
      {<UnderConstruction />}
    </>
  );
}

export default App;
