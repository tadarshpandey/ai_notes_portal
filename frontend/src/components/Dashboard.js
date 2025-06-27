import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NoteViewer from '../components/NoteViewer';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuthAndRefresh } from '../utils/checkAuthAndRefresh';
import axiosInstance from '../api/axiosInstance'; // ✅ added this
import './Dashboard.css';

const Dashboard = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]); // ✅ to hold notes list
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const ok = await checkAuthAndRefresh();
      if (!ok) {
        alert("Session expired, please login again.");
        localStorage.clear();
        navigate('/login');
      } else {
        fetchNotes(); // ✅ fetch notes after auth
      }
    };

    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get('notes/');
        setNotes(res.data);
        if (res.data.length > 0) {
          setSelectedNote(res.data[0]); // ✅ auto-select first note
        }
      } catch (err) {
        console.error("Failed to load notes", err);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="dashboard">
      {/* Left Sidebar */}
      <Sidebar notes={notes} onNoteSelect={setSelectedNote} />

      {/* Right Content */}
      <div className="main-content">
        <h2 className="text-center mt-3">Welcome to dashboard, {username || "User"}!</h2>
        <h6 className="text-center text-muted mb-4">
          DON'T GIVE UP, JUST BE PERSISTENT. KEEP IT UP!
        </h6>

        <div className="text-center mt-4">
          {/* Note viewer */}
          <NoteViewer note={selectedNote} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
