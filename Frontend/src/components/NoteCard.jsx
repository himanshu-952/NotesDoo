import '../styles/NoteCard.css';

const NoteCard = ({ note }) => {
  const filename = `note-${note._id}.pdf`;

 const downloadUrl = note.fileUrl.includes("cloudinary")
  ? note.fileUrl.replace('/upload/', `/upload/fl_attachment:note-${note._id}.pdf/`)
  : note.fileUrl;


  return (
    <div className="note-card">
      <p><strong>Description:</strong> {note.description}</p>
      <p><strong>Uploaded by:</strong> {note.uploadedBy?.username || note.uploadedBy?.email}</p>
      <a
        href={downloadUrl}
        download
        className="download-btn"
      >
        📥 Download PDF
      </a>
    </div>
  );
};

export default NoteCard;
