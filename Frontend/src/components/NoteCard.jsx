import '../styles/NoteCard.css'
const NoteCard = ({ note }) => {
  const fileUrlParts = note.fileUrl.split('/upload/');
  const fileId = fileUrlParts[1]; // everything after /upload/

  const desiredFilename = note.title
    ? note.title.replace(/\s+/g, '-').toLowerCase() + '.pdf'
    : `note-${note._id}.pdf`;

  const downloadUrl = `${fileUrlParts[0]}/upload/fl_attachment:${desiredFilename}/${fileId}`;

  return (
    <div className="note-card">
      <p><strong>Description:</strong> {note.description}</p>
      <p><strong>Uploaded by:</strong> {note.uploadedBy?.username || note.uploadedBy?.email}</p>
      <a href={downloadUrl} className="download-btn" download={desiredFilename}>
        📥 Download PDF
      </a>
    </div>
  );
};


export default NoteCard;
