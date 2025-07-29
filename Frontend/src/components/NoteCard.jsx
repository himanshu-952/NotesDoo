import '../styles/NoteCard.css'

const NoteCard = ({ note }) => {
  // Add `fl_attachment` to force proper PDF handling
  const fixedUrl = note.fileUrl.includes('/upload/')
    ? note.fileUrl.replace('/upload/', '/upload/fl_attachment/')
    : note.fileUrl;

  return (
    <div className="note-card">
      <p><strong>Description:</strong> {note.description}</p>
      <p><strong>Uploaded by:</strong> {note.uploadedBy?.username || note.uploadedBy?.email}</p>
      <a
        href={fixedUrl}
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
