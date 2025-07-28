import '../styles/NoteCard.css';

const NoteCard = ({ note }) => {
  const filename = `note-${note._id}.pdf`;

  const downloadUrl = note.fileUrl.replace(
    '/upload/',
    `/upload/fl_attachment:${filename}/`
  );

  return (
    <div className="note-card">
      <p><strong>Description:</strong> {note.description}</p>
      <p><strong>Uploaded by:</strong> {note.uploadedBy?.username || note.uploadedBy?.email}</p>
      <a
        href={downloadUrl}
        className="download-btn"
      >
        📥 Download PDF
      </a>
    </div>
  );
};

export default NoteCard;
