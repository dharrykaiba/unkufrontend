// src/App.js
/*import React from "react";
import AppRouter from "./routes/AppRouter";
import "./App.css";



function App() {
  return (
    <div className="App">
      <header className="App-header">
     

        <AppRouter />
      </header>
    </div>
  );
}

export default App;
*/
// App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h1>Inicio</h1>;
}

function About() {
  return <h1>Acerca de</h1>;
}

function App() {
  return (
    <Router basename="/unkufrontend">
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Acerca de</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;