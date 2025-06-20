import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NoteViewer from '../components/NoteViewer';
import { Link, useNavigate } from 'react-router-dom';
import { checkAuthAndRefresh } from '../utils/checkAuthAndRefresh';
import './Dashboard.css';

//saving ntes to access it later...
import NoteForm from '../components/NoteForm';

const Dashboard = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate(); // ✅ called inside the component

  useEffect(() => {
    const checkAuth = async () => {
      const ok = await checkAuthAndRefresh();
      if (!ok) {
        alert("Session expired, please login again.");
        localStorage.clear();
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]); // ✅ include navigate in dependency array

  return (
    <div className="dashboard">
      {/* Left Sidebar */}
      <Sidebar onNoteSelect={setSelectedNote} />

      {/* Right Content */}
      <div className="main-content">
        <h2 className="text-center mt-3">Welcome to dashboard, {username || "User"}!</h2>
        <h6 className="text-center text-muted mb-4">
          DON'T GIVE UP, JUST BE PERSISTENT. KEEP IT UP!
        </h6>
        {/* Go to Summarizer button */}
        <div className="text-center mt-4">
          <Link to="/summarize">
            <button className="btn btn-primary btn-lg fixed-width-button">
              Go to Summarizer
            </button>
          </Link>
        </div>
        {/* ✅ Create New Note Form */}
        <NoteForm onNoteCreated={(newNote) => console.log("New note created:", newNote)} />
        
        {/* Note viewer */}
        <NoteViewer note={selectedNote} />

        
      </div>
    </div>
  );
};

export default Dashboard;
