import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Moradas } from './pages/Moradas';
import { AddMoradas } from './pages/AddMorada';
import ProtectedRoute from './Routes/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/moradas" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element = {<ProtectedRoute/>}>
            <Route element = {<Moradas/>} path ="/moradas"/>
          </Route>
          <Route element = {<ProtectedRoute/>}>
            <Route element = {<AddMoradas/>} path ="/addmoradas"/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
