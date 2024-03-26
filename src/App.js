import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ExamList from './ExamList';
import DoExam from './DoExam';
import SubmissionDetail from './SubmissionDetail';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if there is a stored authentication token and username in localStorage
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLoginSuccess = (username, token) => {
    setIsAuthenticated(true);
    setUsername(username);
    // Store the authentication token and username in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };

  return (
    <Router>
      <div className="site-wrap"> {/* Add top padding */}
        <Routes>
          <Route
          path="*"
          element={isAuthenticated ? <AuthenticatedRoutes username={username} /> : <Navigate to='/login' />}
          />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

function AuthenticatedRoutes({ username }) {
  return (
      <>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/exam-list" element={<ExamList />} />
              <Route path="/submission-detail/:examId" element={<SubmissionDetail />} />
              <Route path="/do-exam/:examId" element={<DoExam />} />
          </Routes>
          <Footer/>
      </>
  );
}

export default App;
