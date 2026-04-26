import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BooksPage from './pages/BooksPage';
import MembersPage from './pages/MembersPage';
import IssueBookPage from './pages/IssueBookPage';
import IssueRecordsPage from './pages/IssueRecordsPage';

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
        <Route path="/members" element={<ProtectedRoute><MembersPage /></ProtectedRoute>} />
        <Route path="/issue" element={<ProtectedRoute><IssueBookPage /></ProtectedRoute>} />
        <Route path="/records" element={<ProtectedRoute><IssueRecordsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
