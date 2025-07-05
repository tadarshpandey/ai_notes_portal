// src/pages/Dashboard.js 
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import NoteViewer from '../components/NoteViewer';
import { useNavigate } from 'react-router-dom';
import { checkAuthAndRefresh } from '../utils/checkAuthAndRefresh';
import axiosInstance from '../api/axiosInstance';

import './Dashboard.css';

const Dashboard = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    const initialize = async () => {
      const isAuthenticated = await checkAuthAndRefresh();
      if (!isAuthenticated) {
        alert("Session expired, please log in again.");
        localStorage.clear();
        navigate('/login');
        return;
      }

      try {
        const res = await axiosInstance.get('notes/', {
          withCredentials: true, // ✅ Important if using session auth
        });
        setNotes(res.data);
        if (res.data.length > 0) {
          setSelectedNote(res.data[0]);
        }
      } catch (err) {
        console.error("❌ Failed to load notes:", err.response?.data || err.message);
      }
    };

    initialize();
  }, [navigate]);

  return (
    <div className={darkMode ? 'dashboard bg-gray-900 text-white min-h-screen' : 'dashboard bg-gray-50 text-black min-h-screen'}>
      <div className="flex justify-end p-4">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-1 rounded border border-gray-400 dark:border-white"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        <Sidebar notes={notes} onNoteSelect={setSelectedNote} />

        <div className="flex-1 px-4 py-6">
          <h2 className="text-2xl font-semibold text-center mb-2">Welcome to dashboard, {username} 👋</h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
            DON'T GIVE UP, JUST BE PERSISTENT. KEEP IT UP!
          </p>

          <div className="text-center">
            {selectedNote ? (
              <NoteViewer note={selectedNote} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No notes available. Start by creating one!</p>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center py-4 border-t mt-10 text-sm text-gray-600 dark:text-gray-400">
        Made with 💡 by Adarsh Pandey | AI Notes Portal © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Dashboard;
