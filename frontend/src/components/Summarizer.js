// src/components/Summarizer.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; // ✅ centralized axios instance
import PdfUploader from './PdfUploader';  // ✅ Add this line at the top

const Summarizer = () => {
  const username = localStorage.getItem("username");
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Fetch notes using axiosInstance
  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get('notes/');
      setNotes(response.data);
    } catch (err) {
      console.error('❌ Error fetching notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteSelect = (e) => {
    const noteId = e.target.value;
    setSelectedNoteId(noteId);

    const selected = notes.find((n) => n.id.toString() === noteId);
    setText(selected?.content || '');
    setSummary(selected?.summary || '');

    console.log("📌 Selected Note ID:", noteId);
  };

  const handleClear = () => {
    setSelectedNoteId('');
    setText('');
    setSummary('');
  };

  const generateUniqueTitle = () => {
    const rand = Math.random().toString(36).substring(2, 8);
    const time = new Date().getTime().toString().slice(-5);
    return `note_${rand}${time}`;
  };

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert('Please enter or select some text.');
      return;
    }

    setLoading(true);

    try {
      const isUpdating = !!selectedNoteId;
      const finalTitle = isUpdating ? '' : generateUniqueTitle();

      const response = await axiosInstance.post(
        'summarize/',
        isUpdating
          ? { text, note_id: parseInt(selectedNoteId) }
          : { text, title: finalTitle }
      );

      const generatedSummary = response.data.summary || response.data.summary_text || '';
      setSummary(generatedSummary);

      console.log("✅ Summary received from backend:", generatedSummary);
      fetchNotes();
    } catch (err) {
      console.error('❌ Error summarizing or saving:', err);
      alert('Error summarizing or saving note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="main-content">
        <h3>Hello, {username}</h3>

        {summary && (
          <div className="alert alert-info mt-4">
            <h5>Summary:</h5>
            <p>{summary}</p>
          </div>
        )}

        <div className="mb-3">
          <h5>Enter text to summarize:</h5>
          <textarea
            className="form-control"
            rows="8"
            placeholder="Type or select a note to load it here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <div><PdfUploader onExtractedText={setText} /></div>
          <div><button className="btn btn-primary me-2" onClick={handleSummarize} disabled={loading}>
            
            {loading ? 'Summarizing...' : 'Summarize Text'}
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear All
          </button></div>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
