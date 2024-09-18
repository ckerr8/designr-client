import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route 
    path='/' 
    element={<Dashboard />} />
    <Route 
    path='/projects' 
    element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
