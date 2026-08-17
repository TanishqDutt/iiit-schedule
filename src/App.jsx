import { useState } from 'react'
import './App.css'
import TimetableForm from './components/TimetableForm'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TimetableForm />
    </>
  )
}

export default App
