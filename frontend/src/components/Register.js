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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          A.I. Notes Portal
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already registered?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
