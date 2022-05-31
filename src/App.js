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
      <Route exact path = "/" element={<Signup />} />
      <Route path = "/home" element={<Home />} />
      <Route path = "/register" element={<Register />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
