import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import './styles/TimeTable.css'

import TimeTable from './components/TimeTable'

const Schedule = ({allSem, timeLabels}) => {

    let params = useParams()
    if(!Object.keys(allSem).includes(params.semester)){
        return <h1>SEMESTER NOT FOUND SORRY!</h1>
    }

    let sem = allSem[params.semester]
    let branches = sem.branches

    const [currentBranch, setCurrentBranch] = useState(0);

    function changeCurrentBranch(ind){
        setCurrentBranch(ind)
    }



  return (
    <div>
        <div className="main">
            <div className="navbar">
                {branches.map((branch, ind)=>{
                    return (
                        <button className={`navitem ${ind==currentBranch ? 'selected' : ''}`} onClick={()=>{
                            changeCurrentBranch(ind)
                        }} key={ind}>{branch.toUpperCase()}</button>
                    );
                })}
            </div>
            <div className="timetableArea">
                <TimeTable sem={sem.schedule} timeLabels={timeLabels} branch={branches[currentBranch]} key={branches[currentBranch]}/>
            </div>
        </div>
    </div>
  )
}

export default Schedule
