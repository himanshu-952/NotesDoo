import React, { useState, useEffect } from 'react';
import '../styles/GetNotesPage.css';
import NoteCard from '../components/NoteCard';
import axios from 'axios';

const GetNotesPage = () => {
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const classOptions = ['10', '11', '12', 'CSE' ,'Neet' , 'JEE'];
  const subjectOptions = {
     '10': ['Maths', 'Science', 'English' , 'Social Science' , 'Hindi'],
    '11': ['Physics', 'Chemistry', 'Maths' , 'Biology' , , 'Accounts' , 'Buisness' , 'Poltical Science' , 'Geography' , 'History'],
    '12': ['Biology', 'Economics', 'Maths' , 'Physics' , 'Chemistry' , 'Accounts' , 'Buisness' , 'Poltical Science' , 'Geography' , 'History'],
    'CSE': ['DSA', 'DBMS', 'OS', 'CN'],
    'Neet':['Physics' , 'Chemistry' , 'Biology'],
    'JEE':['Physics' , 'Chemistry' , 'Maths']
  };

  useEffect(() => {
    const fetchNotes = async () => {
      if (selectedClass && selectedSubject) {
        try {
          setLoading(true);
          setError(null);

          const res = await axios.get(
            `https://notesdoo-backend.onrender.com/api/notes?noteClass=${selectedClass}&subject=${selectedSubject}`
          );

          setNotes(res.data || []);
        } catch (err) {
          console.error(err);
          setError('Failed to fetch notes');
          setNotes([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNotes();
  }, [selectedClass, selectedSubject]);

  const filteredNotes = notes.filter(note =>
    note.uploadedBy?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.uploadedBy?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="get-notes-page">
      <h2>📚 Get Notes</h2>

      {step === 1 && (
        <div className="selector">
          <h3>Select Class:</h3>
          {classOptions.map(cls => (
            <button key={cls} onClick={() => { setSelectedClass(cls); setStep(2); }}>
              {cls}
            </button>
          ))}
        </div>
      )}

      {step === 2 && selectedClass && (
        <div className="selector">
          <h3>Select Subject for Class {selectedClass}:</h3>
          {subjectOptions[selectedClass].map(sub => (
            <button key={sub} onClick={() => { setSelectedSubject(sub); setStep(3); }}>
              {sub}
            </button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="notes-section">
          <h3>Showing notes for Class {selectedClass} - {selectedSubject}</h3>

          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-box"
          />

          {loading && <p>Loading notes...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <NoteCard key={note._id} note={note} />
              ))
            ) : (
              <p>No notes found for this class and subject.</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default GetNotesPage;
