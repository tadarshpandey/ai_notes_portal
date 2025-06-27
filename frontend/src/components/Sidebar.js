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


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`notes/${id}/`);
      setNotes(notes.filter(note => note.id !== id)); // Optimistic UI update
    } catch (err) {
      console.error('Error deleting note:', err);
      alert('Failed to delete note.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="sidebar">
      <h3>📝 My Notes</h3>
      {notes.map((note) => (
        <div key={note.id} className="sidebar-item">
          <span onClick={() => onNoteSelect(note)} style={{ cursor: 'pointer' }}>
            {note.title}
          </span>
          <button
            className="delete-btn"
            onClick={() => handleDelete(note.id)}
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
