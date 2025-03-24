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
import { HashRouter as Router, Link } from "react-router-dom";

import AppRouter from "./routes/AppRouter";

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
          <li>
            <Link to="/test">test</Link>
          </li>
        </ul>
      </nav>
      <AppRouter />
    </Router>
  );
}

export default App;
