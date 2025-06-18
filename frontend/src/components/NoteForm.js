import { useState } from 'react';
import axios from 'axios';

function NoteForm() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const access = localStorage.getItem('access');
    console.log("ACCESS TOKEN BEING SENT:", access); //Debug
    try {
      // const access = localStorage.getItem('access');
      // console.log("ACCESS TOKEN:", access); //Debug
      const res = await axios.post('http://localhost:8000/api/summarize/', 
        { text },
        {
          headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      alert('Failed to summarize.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Summarize Your Note</h2>
      <form onSubmit={handleSubmit}>
        <textarea 
          className="form-control mb-3"
          rows="6"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your full note here..."
        />
        <button className="btn btn-primary" type="submit">Summarize</button>
      </form>
      {summary && (
        <div className="mt-4">
          <h4>Summary</h4>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default NoteForm;
