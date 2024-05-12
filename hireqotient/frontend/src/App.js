import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import Chat from './Pages/Chat/Chat';

function App() {

  const ProtectedRoute = ({ children }) => {
    const LoginInfo = localStorage.getItem('token');
    if (!LoginInfo) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
