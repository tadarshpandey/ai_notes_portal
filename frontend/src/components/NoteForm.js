// src/components/NoteForm.js
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // ✅ use your axios wrapper

const NoteForm = ({ onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSaveNote = async () => {
    if (!title || !content) {
      alert('Please enter both title and content.');
      return;
    }

    try {
      setSaving(true);

      const res = await axiosInstance.post('notes/', {
        title,
        content,
      });

      console.log('✅ Note saved:', res.data);
      if (onNoteCreated) onNoteCreated(res.data); // optional callback
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('❌ Error saving note:', err.response?.data || err.message);
      alert('Failed to save note. Are you logged in?');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="note-form mt-3">
      <h5>Create a New Note</h5>
      <input
        type="text"
        placeholder="Note Title"
        className="form-control mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="5"
        placeholder="Note Content"
        className="form-control mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn btn-success btn-lg fixed-width-button" onClick={handleSaveNote} disabled={saving}>
        {saving ? 'Saving...' : 'Save Note'}
      </button>
    </div>
  );
};

export default NoteForm;
