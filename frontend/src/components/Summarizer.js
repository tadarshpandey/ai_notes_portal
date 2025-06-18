// src/components/Summarizer.js
import React, { useState } from 'react';
import axios from 'axios';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('access');  // ✅ correct key

    const response = await fetch(
      "http://127.0.0.1:8000/api/summarize/",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // ✅ correct format
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await response.json();  // ✅ parse response
    if (response.ok) {
      setSummary(data.summary);
    } else {
      throw new Error(data.error || 'Summarization failed');
    }

  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">
      <h2>Summarize Notes</h2>
      <textarea
        rows="10"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text to summarize..."
      />
      <br />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
