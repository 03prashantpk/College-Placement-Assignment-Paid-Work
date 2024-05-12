import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import EditUser from './Pages/EditUser/EditUser';
import SearchAndFilter from './Pages/SearchAndFilter/SearchAndFilter';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/searchandfilter" element={<SearchAndFilter />} />
          <Route path="/" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
