import '../styles/NoteCard.css';

const NoteCard = ({ note }) => {

  const fileUrlParts = note.fileUrl.split('/upload/');
  const publicId = fileUrlParts[1]; f

  const filename = `note-${note._id}.pdf`;

 
  const downloadUrl = `${fileUrlParts[0]}/upload/fl_attachment:${filename}/${publicId}`;

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
