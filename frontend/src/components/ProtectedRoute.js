import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const token = localStorage.getItem('access_token');

  // Only allow if user is logged in AND token exists
  return (isLoggedIn && token) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
