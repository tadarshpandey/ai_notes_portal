import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Summarizer = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access');

  // ✅ Fetch notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  // ✅ Load notes on mount
  useEffect(() => {
    fetchNotes();
  }, [token]);

  // ✅ Handle note selection
  const handleNoteSelect = (e) => {
    const noteId = e.target.value;
    setSelectedNoteId(noteId);
    const selected = notes.find((n) => n.id.toString() === noteId);
    setText(selected?.content || '');
    setSummary('');
  };

  // ✅ Clear all fields
  const handleClear = () => {
    setSelectedNoteId('');
    setText('');
    setSummary('');
  };

  // ✅ Summarize and save/update
  const handleSummarize = async () => {
    if (!text.trim()) {
      alert('Please enter or select some text.');
      return;
    }

    setLoading(true);
    try {
      // 1. Summarize via backend
      const response = await axios.post(
        'http://127.0.0.1:8000/api/summarize/',
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const generatedSummary = response.data.summary;
      setSummary(generatedSummary);

      // 2. Update existing note if selected
      if (selectedNoteId) {
        const existingNote = notes.find((n) => n.id.toString() === selectedNoteId);
        if (existingNote) {
          await axios.put(
            `http://127.0.0.1:8000/api/notes/${selectedNoteId}/`,
            {
              title: existingNote.title,
              content: text,
              summary: generatedSummary,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
        }
      } else {
        // 3. Save new note if no selection
        const shouldSave = window.confirm("No note selected. Do you want to save this as a new note?");
        if (shouldSave) {
          const title = prompt("Enter a title for this note:", "Untitled Note");
          await axios.post(
            'http://127.0.0.1:8000/api/notes/',
            {
              title: title || "Untitled",
              content: text,
              summary: generatedSummary,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
        }
      }

      fetchNotes(); // Refresh list
    } catch (err) {
      alert('Error summarizing or saving note.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>🧠 AI Note Summarizer</h2>

      {/* Note selection */}
      <div className="mb-3">
        <h5>Select a note (optional)</h5>
        <select className="form-select" value={selectedNoteId} onChange={handleNoteSelect}>
          <option value="">-- Choose a Note --</option>
          {notes.map((note) => (
            <option key={note.id} value={note.id}>
              {note.title}
            </option>
          ))}
        </select>
      </div>

      {/* Text input */}
      <div className="mb-3">
        <h5>Enter or edit text to summarize:</h5>
        <textarea
          className="form-control"
          rows="8"
          placeholder="Type or select a note to load it here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleSummarize} disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize Text'}
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear All
        </button>
      </div>

      {/* Summary Output */}
      {summary && (
        <div className="alert alert-info mt-4">
          <h5>Summary:</h5>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
