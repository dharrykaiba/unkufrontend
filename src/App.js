// src/App.js
import React from "react";
import AppRouter from "./routes/AppRouter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Header</p>
        <AppRouter />
      </header>
    </div>
  );
}

export default App;
