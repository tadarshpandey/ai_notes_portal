
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = ({ onNoteSelect }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const token = localStorage.getItem('access');
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/notes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
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
