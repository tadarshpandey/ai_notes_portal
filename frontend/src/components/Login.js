import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginAPI(form);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("username", form.username);
      login(); // update global auth state
      navigate('/dashboard'); // redirect to dashboard
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <h3 className="mb-3 text-center">Login</h3>
      <input className="form-control mb-3" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input className="form-control mb-3" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
}

export default Login;
