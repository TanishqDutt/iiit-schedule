import { useState } from 'react'
import './App.css'
import TimetableForm from './components/TimetableForm'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

function App() {

  const router = createBrowserRouter([
    {
        path: "/",
        element: 
        <>
          <h1>NOTHING TO SEE HERE</h1>
          <Link to={"/editor"}>Go to Editor</Link>
        </>
    },
    {
      path: "/editor",
      element:<TimetableForm />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
