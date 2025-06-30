import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerAPI, login as loginAPI } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAPI(form); // Assumes backend supports all fields

      // Optional: Auto-login after registration
      const { data } = await loginAPI({
        username: form.username,
        password: form.password
      });

      // ✅ Use consistent key names
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("username", form.username);

      login(); // ✅ Update global login state
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Registration failed:', err.response?.data || err.message);
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px', color: '#808000' }}>
        A.I. Notes Portal
      </h1>

      <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
        <h3 className="mb-3 text-center">Register</h3>

        <input className="form-control mb-3" placeholder="First Name" name="first_name" required onChange={handleChange} />
        <input className="form-control mb-3" placeholder="Last Name" name="last_name" required onChange={handleChange} />
        <input className="form-control mb-3" type="email" placeholder="Email" name="email" required onChange={handleChange} />
        <input className="form-control mb-3" placeholder="Username" name="username" required onChange={handleChange} />
        <input className="form-control mb-3" type="password" placeholder="Password" name="password" required onChange={handleChange} />

        <button type="submit" className="btn btn-secondary w-100">Register</button>
        <p className="text-sm text-gray-600 mt-2">
          Already Registered? <Link className="text-blue-500 hover:underline" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
