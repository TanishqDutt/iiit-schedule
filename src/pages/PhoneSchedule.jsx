import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { 
    Monitor, 
    Cpu,  
    CircleArrowRight,
    CircleArrowDown,
    ArrowBigRight,
    ArrowBigLeft
} from 'lucide-react'

import { useParams } from 'react-router-dom'

import './styles/Mobile.css'

import TimeTable from './components/TimeTable'

const PhoneSchedule = ({allSem, timeLabels, teachers}) => {

    let days = ["mon", "teus", "wed", "thurs", "fri", "sat"]
    let currentDate = new Date()
    let todayDay = currentDate.getDay()==0?"mon":days[currentDate.getDay()-1]
    
    // console.log(todayDay);

    let params = useParams()
    if(!Object.keys(allSem).includes(params.semester)){
        return <h1>SEMESTER NOT FOUND SORRY!</h1>
    }

    let sem = allSem[params.semester]
    let branches = sem.branches

    let branchIcon = {
        "Sec-a": "A",
        "Sec-b": "B",
        "cse" : <Monitor size={32} strokeWidth={3} />,
        "ece": <Cpu size={32} strokeWidth={3} />
    }
    
    const [currentBranch, setCurrentBranch] = useState(0);

    function changeCurrentBranch(ind){
        setCurrentBranch(ind)
    }

    const [currentDay, setCurrentDay] = useState(todayDay)


    const [navbarHidden, setNavbarHidden] = useState(false)

    const [popValue, setPopValue] = useState('')



    function showSelectSemesters(){
        if(popValue == "semesters"){
            setPopValue("")
        }
        else{
            setPopValue("semesters")
        }
    }
    function showSelectDays(){
        if(popValue == "days"){
            setPopValue("")
        }
        else{
            setPopValue("days")
        }
    }
    function removePopUp(){
        setPopValue("")
    }












    useEffect(()=>{





        let lastScroll = window.scrollY


        function handleScroll(){

            const currentScroll = window.scrollY

            if(currentScroll > lastScroll && currentScroll > 80){
                setNavbarHidden(true)
            }
            else if(currentScroll < lastScroll){
                setNavbarHidden(false)
            }
            
            
            lastScroll = currentScroll
            removePopUp()
        
        }

        window.addEventListener("scroll", handleScroll)

        return ()=>{
            window.removeEventListener("scroll", handleScroll)
        }
        
    }, [])
    
    
    function isCurrent(si,ei){
        let startTime = timeLabels[si][0]
        let endTime = timeLabels[ei][1]

        let startTimeIndex = startTime.hours * 60 + startTime.minutes
        let endTimeIndex = endTime.hours * 60 + endTime.minutes

        let currentTimeIndex = currentDate.getHours() * 60 + currentDate.getMinutes()
        
        if(currentDate.getDay()===0 || todayDay!==currentDay) return false;
        
        return currentTimeIndex > startTimeIndex && currentTimeIndex < endTimeIndex
    }
    
    function isNext(si){
        let startTime = timeLabels[si][0]
        let startTimeIndex = startTime.hours * 60 + startTime.minutes

        let currentTimeIndex = currentDate.getHours() * 60 + currentDate.getMinutes()

        let allStartTimes =  sem.schedule
        .filter((cb) => cb.day == currentDay)
        .filter((cb) => cb.branch == branches[currentBranch])
        .map(cb => timeLabels[cb.start][0])
        
        let allStartTimeIndices = allStartTimes.map(t => t.hours * 60 + t.minutes)
        
        let laterTimes =  allStartTimeIndices.filter(t => currentTimeIndex < t).sort((a,b) => a - b)
        
        if(currentDate.getDay()===0 || todayDay!==currentDay) return false;
        if(laterTimes.length == 0) return false
        else{
            return startTimeIndex === laterTimes[0]
        }

    }

    

  return (
    <div>
        <div className="mobile-top">
            <div className={`navbar ${navbarHidden ? "hidden" : ""}`}>
                <button className="day-change" onClick={showSelectDays}>{currentDay.toUpperCase()}</button>
                <button className="sem-change" onClick={showSelectSemesters}>{sem.name}</button>
            </div>

            <div className={`rightpane ${navbarHidden ? "hidden" : ""}`}>

                {branches.map(((branchname, ind) => <button onClick={()=>{
                    setCurrentBranch(ind)
                }} key={ind} className={currentBranch == ind ? "selected" : ""}>{branchIcon[branchname]}</button>))}

            </div>

            <div className={`popup semesters ${popValue=="semesters"?"":"hidden"}`}>

                {Object.keys(allSem).map(k => <Link to={`/ps/${k}`} onClick={removePopUp} key={k}>{allSem[k].name}</Link>)}

            </div>

            <div className={`popup days ${popValue=="days"?"":"hidden"}`}>

                {days.map(d => <button onClick={()=>{

                    setCurrentDay(d)
                    removePopUp()


                }} key={d}>{d.toUpperCase()}</button>)}

            </div>

        </div>
        <div className="mobile-main">

            <div className="seperator"></div>

            {
                sem.schedule
                .filter((classblock => classblock.branch === sem.branches[currentBranch]))
                .filter((classblock => classblock.day === currentDay))
                .map(((classblock,ind )=> {

                    return (
                        <div className={`class type-${ind%5 + 1}`} key={classblock.id}>
                            {isCurrent(classblock.start, classblock.end) ? <div className='flag'> Current </div> : null}
                            {isNext(classblock.start) ? <div className='flag'> Next </div> : null}
                            
                            <div className="timebar">
                                <div className="time-label">{timeLabels[classblock.start][0].getString()}</div>
                                <CircleArrowRight size={32} strokeWidth={2} />
                                <div className="time-label">{timeLabels[classblock.end][1].getString()}</div>
                            </div>
                            <div className="classname">
                                <div className="heading">{sem.subjects[classblock.subjectcode]}</div>
                                <div className="code">{classblock.subjectcode}</div>
                            </div>
                            <div className="teachers">
                                Teacher: 
                                <span className="highlighted">
                                   {`${teachers.filter(t=>t.code===classblock.teacher)[0].name}`}
                                </span>
                            </div>
                            <div className="room">
                                {classblock.rooms.length>1?"Rooms": "Room"}: 
                                {classblock.rooms.map(r => <span className='highlighted' key={classblock.id.toString()+r}>{r}</span>)}
                            </div>

                            
                            

                        </div>
                    )


                }))
            }

        </div>
    </div>
  )
}

export default PhoneSchedule
