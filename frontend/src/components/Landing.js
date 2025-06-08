import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Landing = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to AI Notes Summarizer</h1>
      <p>Simplify your study and work with AI-powered note summarization.</p>

      {isLoggedIn ? (
        <>
          <h3>Hello, {username}</h3>
          <button className="btn btn-primary me-2" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
          <button className="btn btn-secondary" onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link className="btn btn-primary me-2" to="/login">Login</Link>
          <Link className="btn btn-secondary" to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Landing;
