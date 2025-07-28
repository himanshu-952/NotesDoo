const NoteCard = ({ note }) => {
  return (
    <div className="note-card">
      <p><strong>Description:</strong> {note.description}</p>
      <p><strong>Uploaded by:</strong> {note.uploadedBy?.username || note.uploadedBy?.email}</p>
      <a
        href={note.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      >
        Download PDF
      </a>
    </div>
  );
};

export default NoteCard;
