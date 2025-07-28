import '../styles/NoteCard.css';

const NoteCard = ({ note }) => {
  const filename = `note-${note._id}.pdf`;

  // Fix the Cloudinary download link: strip version and insert fl_attachment correctly
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
        download
        className="download-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        📥 Download PDF
      </a>
    </div>
  );
};

export default NoteCard;
