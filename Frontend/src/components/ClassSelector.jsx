const classes = ['10', '11', '12', 'CSE']

const ClassSelector = ({ setSelectedClass }) => {
  return (
    <div className="dropdown">
      <label>Select Class:</label>
      <select onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="">--Choose Class--</option>
        {classes.map((cls) => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ClassSelector
