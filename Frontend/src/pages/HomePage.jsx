import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <h1>Welcome to NotesDoo 📚</h1>
      <div className="home-buttons">
        <button onClick={() => navigate('/get-notes')}>Get Notes</button>
        <button onClick={() => navigate('/upload')}>Upload Notes</button>
      </div>
    </div>
  )
}

export default HomePage
