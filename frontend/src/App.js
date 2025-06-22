import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

/**other imports... */
import Navbar from './components/Navbar'; // new
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Summarizer from './components/Summarizer';

function App() {
  return (
    <AuthProvider>
      <Router>

        <Navbar />{/*new */}
        <div style={{ paddingTop: '80px'}}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/summarize" 
            element={<Summarizer />}           />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
