
import './App.css'
import Registration from './Registration'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <Router>
            <Routes>
            <Route path="/" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
  )
}

export default App
