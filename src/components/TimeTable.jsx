import React from 'react'

import "./TimeTable.css"
import sem3 from '../data/sem3'
import {ArrowDown} from 'lucide-react'


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
              <div className={`class s${cls.id}`} style={{
                gridColumn: `${Number(cls.start)+1}/${Number(cls.end)+2}`
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
                gridColumn: `${Number(cls.start)-4+1}/${Number(cls.end)-4+2}`
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
    <div className='main'>
      <div className="timetable">
        <div className="columnnames">
          <div className="section before">
            {sem3.timeLabels.filter((time, index)=> index<=3).map((time)=>{
              return (
                <div className='time'>{time[0].getString()} <ArrowDown/> {time[1].getString()}</div>
              )
            })}
          </div>
          <div className="break"></div>
          <div className="section after">
            {sem3.timeLabels.filter((time, index)=> index>=4).map((time)=>{
              return (
                <div className='time'>{time[0].getString()} <ArrowDown/> {time[1].getString()}</div>
              )
            })}
          </div>
        </div>
        <div className="rownames">
          {days.map((day)=>{
            return(
              <div className="rowname">{day}</div>
            )
          })}
        </div>
        <TimeTableBlock />
        
      </div>
    </div>
  )
}

export default TimeTable
