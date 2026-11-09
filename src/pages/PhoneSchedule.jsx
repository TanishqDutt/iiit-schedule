import React, { useEffect, useState } from 'react'

import { Monitor, Cpu, ArrowRight} from 'lucide-react'

import { useParams } from 'react-router-dom'

import './styles/Mobile.css'

import TimeTable from './components/TimeTable'

const PhoneSchedule = ({allSem, timeLabels}) => {

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

    const [currentDay, setCurrentDay] = useState('teus')


    const [navbarHidden, setNavbarHidden] = useState(false)








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
        
        }

        window.addEventListener("scroll", handleScroll)

        
        
    }, [])
    
    



  return (
    <div>
        <div className="mobile-top">
            <div className={`navbar ${navbarHidden ? "hidden" : ""}`}>
                <button className="day-change">{currentDay.toUpperCase()}</button>
                <button className="sem-change">{sem.name}</button>
            </div>

            <div className={`rightpane ${navbarHidden ? "hidden" : ""}`}>

                {branches.map(((branchname, ind) => <button onClick={()=>{
                    setCurrentBranch(ind)
                }} key={ind} className={currentBranch == ind ? "selected" : ""}>{branchIcon[branchname]}</button>))}

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
                            
                            <div className="timebar">
                                <div className="time-label">{timeLabels[classblock.start][0].getString()}</div>
                                <ArrowRight size={32} strokeWidth={3} />
                                <div className="time-label">{timeLabels[classblock.end][1].getString()}</div>
                            </div>
                            <div className="classname">{`${sem.subjects[classblock.subjectcode]}`}</div>
                            <div className="teachers">{`${classblock.teacher}`}</div>
                            <div className="room">{`${classblock.rooms}`}</div>

                        </div>
                    )


                }))
            }

        </div>
    </div>
  )
}

export default PhoneSchedule
