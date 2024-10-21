
import './App.css'
import Registration from './Registration'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './components/Feed'

function App() {


  return (
    <Router>
            <Routes>
            <Route path="/" element={<Login />} />
                <Route path="/register" element={<Registration />} />
    <Feed/>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
  )
}

export default App
