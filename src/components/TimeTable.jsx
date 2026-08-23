import React from 'react'

import "./TimeTable.css"
import sem3 from '../data/sem3'


let days = ["mon", "teus", "wed", "thurs", "fri", "sat"]

let initBranches = ["cse", "ece"]




const TimeTableBlock = () => {
  return (
    <div className="timetableblock">

      {days.map((elem) => 
      <div className="row" key={elem}>

        <div className="section before">
          {sem3.sem3.filter((c) => c.day == elem && c.end<=3).map((cls) => {
            
            return(
              <div className="class" style={{
                left:(cls.start*120).toString()+"px",
                width:((cls.end - cls.start + 1)*120).toString()+"px"
              }}>
                {cls.subjectcode}
              </div>
            )

          })}
        </div>
        <div className="break"></div>
        <div className="section after">
          {sem3.sem3.filter((c) => c.day == elem && c.start>=4).map((cls) => {
            
            return(
              <div className="class" style={{
                left:((Number(cls.start) - 4)*120).toString()+"px",
                width:((cls.end - cls.start + 1)*120).toString()+"px"
              }}>
                {cls.subjectcode}
              </div>
            )

          })}
        </div>


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
