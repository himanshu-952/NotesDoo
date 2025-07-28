import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/UploadNotes.css';

const UploadNotesPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();
  const token = localStorage.getItem('token');


  if (!token) {
  return (
    <div
      style={{
        marginTop: '100px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#d32f2f', 
        fontFamily: 'Arial, sans-serif',
      }}
    >
      ⚠️ Please login first to upload notes
    </div>
  );
}


  const classOptions = ['10', '11', '12', 'CSE' ,'Neet' , 'JEE'];
  const subjectOptions = {
    '10': ['Maths', 'Science', 'English' , 'Social Science' , 'Hindi'],
    '11': ['Physics', 'Chemistry', 'Maths' , 'Biology' ,  'Accounts' , 'Buisness' , 'Poltical Science' , 'Geography' , 'History'],
    '12': ['Biology', 'Economics', 'Maths' , 'Physics' , 'Chemistry' , 'Accounts' , 'Buisness' , 'Poltical Science' , 'Geography' , 'History'],
    'CSE': ['DSA', 'DBMS', 'OS', 'CN'],
    'Neet':['Physics' , 'Chemistry' , 'Biology'],
    'JEE':['Physics' , 'Chemistry' , 'Maths']
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSubject || !description || !file) {
      setMessage('⚠️ Please fill all fields');
      return;
    }

    if (!token) {
      setMessage('❌ You must be logged in to upload.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const formData = new FormData();
      formData.append('noteClass', selectedClass);
      formData.append('subject', selectedSubject);
      formData.append('description', description);
      formData.append('pdf', file);

      const res = await axios.post(
        'https://notesdoo-backend.onrender.com/api/notes/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      setMessage('✅ Note uploaded successfully!');
      setSelectedClass('');
      setSelectedSubject('');
      setDescription('');
      setFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error(error);
      setMessage('❌ Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-notes-page">
      <h2>📤 Upload Notes</h2>
      <form onSubmit={handleUpload}>
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setSelectedSubject('');
            setMessage('');
          }}
        >
          <option value="">Select Class</option>
          {classOptions.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        {selectedClass && (
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setMessage('');
            }}
          >
            <option value="">Select Subject</option>
            {subjectOptions[selectedClass].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setMessage('');
          }}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setMessage('');
          }}
          ref={fileInputRef}
        />

        {file && <p>Selected File: {file.name}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default UploadNotesPage;
