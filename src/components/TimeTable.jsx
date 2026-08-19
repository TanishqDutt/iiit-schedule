import React from 'react'

import "./TimeTable.css"
import sem3 from '../data/sem3'


let days = ["mon", "teus", "wed", "thurs", "fri", "sat"]

let initBranches = ["cse", "ece"]




const TimeTableBlock = () => {
  return (
    <div className="timetableblock">

      {days.map((elem) => <div className="row" key={elem}>

        {sem3.sem3.filter((c) => c.day == elem).map((cls) => {
          
          return(
            <div className="class" style={{
              left:(cls.start*120).toString()+"px",
              width:((cls.end - cls.start + 1)*120).toString()+"px"
            }}>
              {cls.subjectcode}
            </div>
          )

        })}

      </div>)}


    </div>
  )
}



const TimeTable = () => {
  return (
    <div className='timetable'>
      <TimeTableBlock />
    </div>
  )
}

export default TimeTable
