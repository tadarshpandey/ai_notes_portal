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

      // ✅ Use consistent keys across app
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("username", form.username);

      login();               // ✅ Update global login state
      navigate('/');         // ✅ Redirect to dashboard
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <div Login>
      <h1 style={{ textAlign: 'center', marginTop: '20px', color: '#808000' }}> A.I. Notes Portal </h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
        <h3 className="mb-3 text-center">Login</h3>
        <input className="form-control mb-3" placeholder="Username" value={form.username}
               onChange={e => setForm({ ...form, username: e.target.value })} />
        <input className="form-control mb-3" placeholder="Password" type="password" value={form.password}
               onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <p className="text-sm text-gray-600 mt-2">
          New here? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
