// src/components/Sidebar.js
import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import './Sidebar.css';

const Sidebar = ({ onNoteSelect }) => {
  const [notes, setNotes] = useState([]);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get('notes/');
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`notes/${id}/`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
      alert('Failed to delete note.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className={darkMode ? 'bg-gray-800 text-white w-full lg:w-1/4 p-4 min-h-screen' : 'bg-white text-black w-full lg:w-1/4 p-4 min-h-screen shadow'}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">📝 My Notes</h3>
        <button
          onClick={toggleDarkMode}
          className="text-sm px-2 py-1 border rounded dark:border-white border-gray-400"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex justify-between items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
          >
            <span
              onClick={() => onNoteSelect(note)}
              className="truncate flex-grow"
              title={note.title}
            >
              {note.title}
            </span>
            <button
              onClick={() => handleDelete(note.id)}
              title="Delete note"
              className="ml-2 text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <footer className="mt-8 text-sm text-center text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} AI Notes Portal
      </footer>
    </div>
  );
};

export default Sidebar;
