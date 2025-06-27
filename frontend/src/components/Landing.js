import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
/**there adding imports for summarizer feature */
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; // ✅ replace axios
import './Landing.css';
import Sidebar from '../components/Sidebar';
import NoteViewer from './NoteViewer';
import Summarizer from './Summarizer';

const Landing = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  /** from line 16 to 22 const added for summarizer feature */
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  /**again for summarizer from line 24-34 */
  // ✅ Fetch notes from backend using axiosInstance
  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get('notes/');
      setNotes(response.data);
    } catch (err) {
      console.error('❌ Error fetching notes:', err);
    }
  };

  /**again for summarizer feature from 37-114 lines of codes */
  // ✅ Load notes on mount or token change
  useEffect(() => {
    fetchNotes();
  }, []);

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
      const isUpdating = !!selectedNoteId;
      const finalTitle = isUpdating ? '' : generateUniqueTitle();

      console.log("📤 Payload to summarize API:", isUpdating
        ? { text, note_id: parseInt(selectedNoteId) }
        : { text, title: finalTitle });

      // 🔥 Use axiosInstance to make POST request to summarize
      const response = await axiosInstance.post(
        'summarize/',
        isUpdating
          ? { text, note_id: parseInt(selectedNoteId) }
          : { text, title: finalTitle }
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

  /**END */
  return (
    <div className="container text-center mt-5">
      <h1>🧠 Welcome to AI Notes Summarizer</h1>
      <p>Simplify your study and work with AI-powered note summarization.</p>

      {isLoggedIn ? (
        <div className='landing'>
          <Summarizer />
        </div>
      ) : (
        <>
          <Link className="btn btn-primary me-2" to="/login">Login</Link>
          <Link className="btn btn-secondary" to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Landing;
