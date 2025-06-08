/**import { useState, useContext } from 'react';
 * 
 * 
import { useNavigate } from 'react-router-dom';
import { register as registerAPI, login as loginAPI } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAPI(form);
      // Optional: auto-login after register
      const { data } = await loginAPI(form);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("username", form.username);
      login();
      navigate('/dashboard');
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <h3 className="mb-3 text-center">Register</h3>
      <input className="form-control mb-3" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input className="form-control mb-3" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="btn btn-secondary w-100">Register</button>
    </form>
  );
}

export default Register;
*/

/**new modified code for src/components/Register.js */

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
      const { data } = await loginAPI({ username: form.username, password: form.password });
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("username", form.username);
      login();
      navigate('/dashboard');
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
      <h3 className="mb-3 text-center">Register</h3>
      
      <input
        className="form-control mb-3"
        placeholder="First Name"
        name="first_name"
        required
        onChange={handleChange}
      />
      
      <input
        className="form-control mb-3"
        placeholder="Last Name"
        name="last_name"
        required
        onChange={handleChange}
      />
      
      <input
        className="form-control mb-3"
        type="email"
        placeholder="Email"
        name="email"
        required
        onChange={handleChange}
      />
      
      <input
        className="form-control mb-3"
        placeholder="Username"
        name="username"
        required
        onChange={handleChange}
      />
      
      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={handleChange}
      />
      
      <button type="submit" className="btn btn-secondary w-100">Register</button>
    </form>
  );
}

export default Register;
