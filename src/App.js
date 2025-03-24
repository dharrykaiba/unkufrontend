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
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

function Home() {
  return <h1>Inicio</h1>;
}

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

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/about">Acerca de</Link>
          </li>
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
