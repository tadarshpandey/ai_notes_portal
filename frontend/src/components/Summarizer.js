// src/components/Summarizer.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import PdfUploader from './PdfUploader';
import './Summarizer.css';

const Summarizer = () => {
  const username = localStorage.getItem("username");
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    if (selected) {
      setText(selected.content || '');
      setSummary(selected.summary || '');
    } else {
      setText('');
      setSummary('');
    }
  };

  const handleClear = () => {
    setSelectedNoteId('');
    setText('');
    setSummary('');
  };

  const handleExport = () => {
    const blob = new Blob([`Text:\n${text}\n\nSummary:\n${summary}`], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'summary.txt';
    link.click();
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
      const payload = isUpdating
        ? { text, note_id: parseInt(selectedNoteId) }
        : { text, title: generateUniqueTitle() };

      const response = await axiosInstance.post('summarize/', payload);

      const generatedSummary = response.data.summary || response.data.summary_text || '';
      setSummary(generatedSummary);
      await fetchNotes();
    } catch (err) {
      console.error('❌ Error summarizing or saving:', err);
      alert('Error summarizing or saving note.');
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    (note.title + ' ' + note.content).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="summarizer-container">
      <h3 className="greeting">Hello, {username || "User"} 👋</h3>

      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Search by Keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <select
          className="form-select"
          value={selectedNoteId}
          onChange={handleNoteSelect}
        >
          <option value="">-- Select a Note --</option>
          {filteredNotes.map((note) => (
            <option key={note.id} value={note.id}>
              {note.title}
            </option>
          ))}
        </select>
      </div>

      {summary && (
        <div className="alert alert-info mt-3 summary-box">
          <h5>Summary:</h5>
          <p>{summary}</p>
        </div>
      )}

      <div className="input-area">
        <textarea
          className="form-control note-input"
          placeholder="Type or paste text to summarize..."
          maxLength={25000}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="action-bar mt-3">
          <PdfUploader onExtractedText={setText} />
          <button
            className="btn btn-primary me-2"
            onClick={handleSummarize}
            disabled={loading}
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
          <button className="btn btn-secondary me-2" onClick={handleClear}>
            Clear
          </button>
          <button
            className="btn btn-success"
            onClick={handleExport}
            disabled={!summary}
          >
            Export Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
