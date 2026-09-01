
// import "../styles/TimeTable.css"
import {ArrowDown} from 'lucide-react'


let days = ["mon", "teus", "wed", "thurs", "fri", "sat"]


const TimeTableBlock = ({sem, branch}) => {
  return (
    <div className="timetableblock">

      {days.map((elem) => 
      <div className="row" key={elem}>

        <div className="section before">
          {sem.filter((c) => c.day == elem && c.end<=3 && c.branch == branch).map((cls) => {
            
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
          {sem.filter((c) => c.day == elem && c.start>=4 && c.branch == branch).map((cls) => {
            
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



const TimeTable = ({sem, timeLabels, branch}) => {
  return (
    <div className="timetable">
      <div className="columnnames">
        <div className="section before">
          {timeLabels.filter((time, index)=> index<=3).map((time)=>{
            return (
              <div className='time'>{time[0].getString()} <ArrowDown/> {time[1].getString()}</div>
            )
          })}
        </div>
        <div className="break"></div>
        <div className="section after">
          {timeLabels.filter((time, index)=> index>=4).map((time)=>{
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
      <TimeTableBlock sem={sem} branch={branch}/>
      
    </div>
  )
}

export default TimeTable
