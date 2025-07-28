import '../styles/NoteCard.css';

const NoteCard = ({ note }) => {
  return (
    <div className="note-card">
      <p><strong>Description:</strong> {note.description}</p>
      <p><strong>Uploaded by:</strong> {note.uploadedBy?.username || note.uploadedBy?.email}</p>

      {/* View PDF in browser tab */}
      <a
        href={note.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      >
        📄 View PDF
      </a>
    </div>
  );
};

export default NoteCard;
