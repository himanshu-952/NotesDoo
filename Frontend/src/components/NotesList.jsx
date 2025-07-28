import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/NotesList.css'

const NotesList = ({ selectedClass, selectedSubject }) => {
  const [notes, setNotes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `https://notesdoo-backend.onrender.com/api/notes/${selectedClass}/${selectedSubject}`
        )
        setNotes(res.data)
      } catch (err) {
        console.error('Error fetching notes:', err)
      }
    }

    fetchNotes()
  }, [selectedClass, selectedSubject])

  const filtered = notes.filter((note) =>
    note.uploadedBy?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="notes-section">
      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <div className="notes-list">
        {filtered.length ? (
          filtered.map((note) => (
            <div className="note-card" key={note._id}>
              <h4>{note.description}</h4>
              <p><strong>Uploaded by:</strong> {note.uploadedBy?.email}</p>
              <a href={note.fileUrl} target="_blank" rel="noopener noreferrer">📄 View PDF</a>

            </div>
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </div>
  )
}

export default NotesList
