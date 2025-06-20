
// src/components/NoteForm.js
import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSaveNote = async () => {
    const token = localStorage.getItem('access');

    if (!title || !content) {
      alert('Please enter both title and content.');
      return;
    }

    try {
      setSaving(true);

      const res = await axios.post('http://127.0.0.1:8000/api/notes/', {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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


// import { useState } from 'react';
// import axios from 'axios';

// function NoteForm() {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const access = localStorage.getItem('access');
//     console.log("ACCESS TOKEN BEING SENT:", access); //Debug
//     try {
//       // const access = localStorage.getItem('access');
//       // console.log("ACCESS TOKEN:", access); //Debug
//       const res = await axios.post('http://localhost:8000/api/summarize/', 
//         { text },
//         {
//           headers: {
//             'Authorization': `Bearer ${access}`,
//             'Content-Type': 'application/json',
//           }
//         }
//       );
//       setSummary(res.data.summary);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to summarize.');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Summarize Your Note</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea 
//           className="form-control mb-3"
//           rows="6"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Enter your full note here..."
//         />
//         <button className="btn btn-primary" type="submit">Summarize</button>
//       </form>
//       {summary && (
//         <div className="mt-4">
//           <h4>Summary</h4>
//           <p>{summary}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NoteForm;
