import { useState } from 'react'
import './pages/styles/App.css'
import TimetableForm from './pages/TimetableForm'
import { createHashRouter, RouterProvider, Link } from 'react-router-dom'
import TimeTable from './pages/components/TimeTable'
import Schedule from './pages/Schedule'

import data from './data/allSem'
const {allSem, timeLabels} = data

function App() {

  const router = createHashRouter([
    {
        path: "/",
        element: 
        <>
          <h1>NOTHING TO SEE HERE</h1>
          <ul>
            <li>
              <Link to={"/editor"}>Go to Editor</Link>
            </li>
            {
              Object.keys(allSem).map((sem)=>{
                return (
                  <li>
                    <Link to={`/s/${sem}`}>Go to /s/{sem}</Link>
                  </li>
                )
              })
            }
          </ul>
        </>
    },
    {
      path: "/editor",
      element:<TimetableForm />
    },
    {
      path: "/s/:semester",
      element: <Schedule timeLabels={timeLabels} allSem={allSem}/>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
