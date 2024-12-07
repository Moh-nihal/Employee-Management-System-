import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DynamicForm from './components/DynamicForm';
import EmployeeList from './components/EmployeeList';
import Register from './components/Register';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/form" element={<DynamicForm />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
        </Router>
    );
}

export default App;
