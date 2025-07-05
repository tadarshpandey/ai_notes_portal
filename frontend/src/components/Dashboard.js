// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NoteViewer from '../components/NoteViewer';
import { useNavigate } from 'react-router-dom';
import { checkAuthAndRefresh } from '../utils/checkAuthAndRefresh';
import axiosInstance from '../api/axiosInstance';

const Dashboard = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

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
        const res = await axiosInstance.get('notes/');
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
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-gray-900 min-h-screen'}>
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-3 border-b shadow bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold">Welcome, {username} 👋</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm border rounded px-3 py-1"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4 w-full">
          <Sidebar onNoteSelect={setSelectedNote} />
        </div>

        <div className="lg:w-3/4 w-full p-6">
          <h3 className="text-lg mb-2 font-semibold">
            Dashboard Overview
          </h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            DON'T GIVE UP, JUST BE PERSISTENT. KEEP IT UP!
          </p>

          {selectedNote ? (
            <NoteViewer note={selectedNote} />
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-300">
              No notes available. Start by creating one!
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs py-4 border-t mt-6 dark:text-gray-400 text-gray-600">
        &copy; {new Date().getFullYear()} AI Notes Portal — Built with 💡 by Adarsh
      </footer>
    </div>
  );
};

export default Dashboard;
