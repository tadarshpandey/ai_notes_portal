import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Summarizer = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access');

  // ✅ Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (err) {
      console.error('❌ Error fetching notes:', err);
    }
  };

  // ✅ Load notes on mount or token change
  useEffect(() => {
    fetchNotes();
  }, [token]);

  // ✅ When a note is selected from dropdown
  const handleNoteSelect = (e) => {
    const noteId = e.target.value;
    setSelectedNoteId(noteId);

    const selected = notes.find((n) => n.id.toString() === noteId);
    setText(selected?.content || '');
    setSummary(selected?.summary || '');

    console.log("📌 Selected Note ID:", noteId); // ✅ Debug which note is selected
  };

  // ✅ Clear form
  const handleClear = () => {
    setSelectedNoteId('');
    setText('');
    setSummary('');
  };

  // ✅ Generate unique title for new notes
  const generateUniqueTitle = () => {
    const rand = Math.random().toString(36).substring(2, 8);
    const time = new Date().getTime().toString().slice(-5);
    return `note_${rand}${time}`;
  };

  // ✅ Summarize and handle backend communication
  const handleSummarize = async () => {
    if (!text.trim()) {
      alert('Please enter or select some text.');
      return;
    }

    setLoading(true);

    try {
      const isUpdating = !!selectedNoteId; // ✅ Determines if we're editing or creating
      const finalTitle = isUpdating ? '' : generateUniqueTitle(); // Only generate title for new note

      // ✅ Log what's being sent to backend
      console.log("📤 Payload to summarize API:", isUpdating
        ? { text, note_id: parseInt(selectedNoteId) }
        : { text, title: finalTitle });

      // 🔥 Make POST request to summarize
      const response = await axios.post(
        'http://127.0.0.1:8000/api/summarize/',
        isUpdating
          ? { text, note_id: parseInt(selectedNoteId) } // ✅ Send note_id as int
          : { text, title: finalTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const generatedSummary = response.data.summary || response.data.summary_text || '';
      setSummary(generatedSummary);

      console.log("✅ Summary received from backend:", generatedSummary);

      fetchNotes(); // ✅ Refresh notes list to reflect updates
    } catch (err) {
      console.error('❌ Error summarizing or saving:', err);
      alert('Error summarizing or saving note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>🧠 AI Note Summarizer</h2>

      {/* Note selection dropdown */}
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

      {/* Text input area */}
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

      {/* Action buttons */}
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleSummarize} disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize Text'}
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear All
        </button>
      </div>

      {/* Summary output box */}
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
