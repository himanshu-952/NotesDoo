const subjectsByClass = {
  '10': ['Math', 'Science', 'English' , 'Social Science'],
  '11': ['Physics', 'Chemistry', 'Math' , 'Biology'],
  '12': ['Biology', 'Computer', 'Math' , 'Biology'],
  CSE: ['DSA', 'DBMS', 'CN', 'OS'],
}

const SubjectSelector = ({ selectedClass, setSelectedSubject }) => {
  return (
    <div className="dropdown">
      <label>Select Subject:</label>
      <select onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="">--Choose Subject--</option>
        {subjectsByClass[selectedClass]?.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SubjectSelector
