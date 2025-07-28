import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://notesdoo-backend.onrender.com/api/admin/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data);
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to fetch notes');
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://notesdoo-backend.onrender.com/api/admin/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('🗑️ Note deleted');
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error(error);
      setMessage('❌ Deletion failed');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="admin-panel">
      <h2>🛠️ Admin Panel</h2>
      {message && <p className="message">{message}</p>}
      {notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <p><strong>Class:</strong> {note.class}</p>
              <p><strong>Subject:</strong> {note.subject}</p>
              <p><strong>Description:</strong> {note.description}</p>
              <p><strong>Uploaded by:</strong> {note.uploadedBy?.email || 'Unknown'}</p>
             <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">📄 View PDF</a>

              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
