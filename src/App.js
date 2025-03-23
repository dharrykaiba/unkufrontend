// src/App.js
import React from "react";
import AppRouter from "./routes/AppRouter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Header change</p>
        <AppRouter />
      </header>
    </div>
  );
}

export default App;
