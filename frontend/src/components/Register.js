import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      console.log("📤 Sending data to backend:", form);
      await registerAPI(form);

      const { data } = await loginAPI({
        username: form.username,
        password: form.password
      });

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("username", form.username);

      login(); // Update global login state
      navigate('/');
    } catch (err) {
      const errorData = err.response?.data || {};
      console.error('❌ Registration failed:', errorData);

      if (errorData.username?.[0]?.includes("already exists")) {
        alert("Username already exists. Please choose a different one.");
      } else if (errorData.email?.[0]?.includes("already exists")) {
        alert("Email already exists. Please use another email.");
      } else if (errorData.password?.[0]?.toLowerCase().includes("too short")) {
        alert("Password is too short. Please use a stronger password (minimum 8 characters).");
      } else {
        // Show first available error message, or fallback
        const fallbackMsg =
          errorData.username?.[0] ||
          errorData.email?.[0] ||
          errorData.password?.[0] ||
          "Registration failed. Please check your inputs.";
        alert(fallbackMsg);
      }
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px', color: '#808000' }}>
        A.I. Notes Portal
      </h1>

      <form 
        onSubmit={handleSubmit} 
        className="p-4 border rounded" 
        style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}
      >
        <h3 className="mb-3 text-center">Register</h3>

        <input 
          className="form-control mb-3" 
          placeholder="First Name" 
          name="first_name" 
          value={form.first_name}
          onChange={handleChange} 
          required 
        />
        <input 
          className="form-control mb-3" 
          placeholder="Last Name" 
          name="last_name" 
          value={form.last_name}
          onChange={handleChange} 
          required 
        />
        <input 
          className="form-control mb-3" 
          type="email" 
          placeholder="Email" 
          name="email" 
          value={form.email}
          onChange={handleChange} 
          required 
        />
        <input 
          className="form-control mb-3" 
          placeholder="Username" 
          name="username" 
          value={form.username}
          onChange={handleChange} 
          required 
        />
        <input 
          className="form-control mb-3" 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={form.password}
          onChange={handleChange} 
          required 
        />

        <button type="submit" className="btn btn-secondary w-100">Register</button>

        <p className="text-sm text-gray-600 mt-2">
          Already Registered? <Link className="text-blue-500 hover:underline" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
