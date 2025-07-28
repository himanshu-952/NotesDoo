import '../styles/NoteCard.css';

const NoteCard = ({ note }) => {
  // Modify the Cloudinary URL to prevent forced download
  const viewableUrl = note.fileUrl.replace("/upload/", "/upload/fl_attachment:false/");

  return (
    <div className="note-card">
      <p><strong>Description:</strong> {note.description}</p>
      <p><strong>Uploaded by:</strong> {note.uploadedBy?.username || note.uploadedBy?.email}</p>
      
      {/* View PDF in browser tab */}
      <a
        href={viewableUrl}
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
