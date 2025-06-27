// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // ✅ use shared instance
import './Sidebar.css';

const Sidebar = ({ onNoteSelect }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get('notes/'); // ✅ no need to manually set headers
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="sidebar">
      <h3>📝 My Notes</h3>
      {notes.map((note) => (
        <div
          key={note.id}
          className="sidebar-item"
          onClick={() => onNoteSelect(note)}
        >
          {note.title}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
