import React from 'react';

const NoteViewer = ({ note }) => {
  if (!note) {
    return <div>Select a note from the sidebar</div>;
  }
  else{
  return (
    <div style={{ padding: '20px' }}>
      <h2>{note.title}</h2>
      <p><strong>Content:</strong> {note.content}</p>
      <p><strong>Summary:</strong> {note.summary || ''}</p>
    </div>
  );
}
};

export default NoteViewer;
