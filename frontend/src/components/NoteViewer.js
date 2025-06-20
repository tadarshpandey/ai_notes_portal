import React from 'react';

const NoteViewer = ({ note }) => {
  if (!note) {
    return <div>Select a note from the sidebar</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{note.title}</h2>
      <p><strong>Content:</strong> {note.content}</p>
      <p><strong>Summary:</strong> {note.summary || 'Not summarized yet.'}</p>
    </div>
  );
};

export default NoteViewer;
