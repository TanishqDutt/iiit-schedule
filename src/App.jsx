import { useState } from 'react'
import './App.css'
import TimetableForm from './components/TimetableForm'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import TimeTable from './components/TimeTable'



function App() {

  const router = createBrowserRouter([
    {
        path: "/",
        element: 
        <>
          <h1>NOTHING TO SEE HERE</h1>
          <ul>
            <li>
              <Link to={"/editor"}>Go to Editor</Link>
            </li>
            <li>
              <Link to={"/sem3-cse"}>Go to TimeTable</Link>
            </li>
          </ul>
        </>
    },
    {
      path: "/editor",
      element:<TimetableForm />
    },
    {
      path: "/sem3-cse",
      element: <TimeTable />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
