import "./App.css";

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Footer, Nav } from "./components";
import { routes } from "./config/routes";

function App() {
  return (
    <div className="app">
      <Nav />

      <Routes>
        {routes.map(({ path, element }, key) => (
          <Route key={key} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
