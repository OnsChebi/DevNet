import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Feed from './components/Feed'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Feed/>
    </>
  )
}

export default App
