// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NoteViewer from '../components/NoteViewer';
import { useNavigate } from 'react-router-dom';
import { checkAuthAndRefresh } from '../utils/checkAuthAndRefresh';
import axiosInstance from '../api/axiosInstance';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      const isAuthenticated = await checkAuthAndRefresh();
      if (!isAuthenticated) {
        alert("Session expired, please login again.");
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
        console.error("❌ Failed to load notes:", err);
      }
    };

    initialize();
  }, [navigate]);

  return (
    <div className="dashboard">
      <Sidebar notes={notes} onNoteSelect={setSelectedNote} />

      <div className="main-content">
        <h2 className="text-center mt-3">Welcome to dashboard, {username} 👋</h2>
        <h6 className="text-center text-muted mb-4">
          DON'T GIVE UP, JUST BE PERSISTENT. KEEP IT UP!
        </h6>

        <div className="text-center mt-4">
          {selectedNote ? (
            <NoteViewer note={selectedNote} />
          ) : (
            <p className="text-muted">No notes available. Start by creating one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
