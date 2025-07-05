import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Summarizer from './Summarizer';

const Landing = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-black min-h-screen'}>
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-1 rounded border border-gray-400 dark:border-white"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            🧠 Welcome to AI Notes Summarizer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Simplify your study and work with AI-powered note summarization.
          </p>

          {isLoggedIn ? (
            <div className="w-full">
              <Summarizer />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow hover:bg-gray-400 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-4 border-t mt-10 text-sm text-gray-600 dark:text-gray-400">
        Made with 💡 by Adarsh Pandey | AI Notes Portal © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Landing;
