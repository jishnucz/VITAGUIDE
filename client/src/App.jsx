import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import SymptomsForm from './SymptomsForm'; // Import SymptomsForm component


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/symptoms-form" element={<SymptomsForm />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
