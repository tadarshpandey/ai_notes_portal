import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import PdfUploader from './PdfUploader';

const Summarizer = () => {
  const username = localStorage.getItem("username");
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

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
    if (text.length > 25000) {
      alert("Text is too long. Please shorten it.");
      return;
    }

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
      const message = err.response?.data?.detail || err.message || "Unknown error.";
      alert(`Error summarizing note:\n${message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    (note.title + ' ' + note.content).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Hello, {username || "User"} 👋</h3>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-1 rounded border border-gray-400 dark:border-white"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by Keywords..."
          className="w-full p-2 border rounded mb-4 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded mb-4 text-black"
          value={selectedNoteId}
          onChange={handleNoteSelect}
        >
          <option value="">-- Select a Note --</option>
          {filteredNotes.map((note) => (
            <option key={note.id} value={note.id} className="text-black">
              {note.title}
            </option>
          ))}
        </select>

        {summary && (
          <div className="bg-blue-100 text-blue-800 p-4 rounded mb-4">
            <h5 className="font-semibold mb-2">Summary:</h5>
            <p>{summary}</p>
          </div>
        )}

        <textarea
          className="w-full h-40 p-3 border rounded resize-none text-black"
          placeholder="Type or paste text to summarize..."
          maxLength={25000}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex flex-wrap gap-3 mt-4">
          <PdfUploader onExtractedText={setText} />
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Clear
          </button>
          <button
            onClick={handleExport}
            disabled={!summary}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Export Summary
          </button>
        </div>
      </div>

      <footer className="text-center py-4 border-t mt-10 text-sm text-gray-600 dark:text-gray-400">
        Made with 💡 by Adarsh Pandey | AI Notes Portal © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Summarizer;
