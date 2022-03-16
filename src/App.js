import logo from './logo.svg';
import './App.css';
import React from 'react';
import Signup from './components/Signup';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path = "/" element={<Signup />} />
      <Route path = "/register" element={<Register />} />
      <Route path = "/home" element={<Home />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
