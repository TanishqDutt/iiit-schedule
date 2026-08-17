import React, { useState } from 'react'
import sem3 from '../data/sem3'
import { ArrowRight, Check } from 'lucide-react'

let days = ["mon", "teus", "wed", "thurs", "fri", "sat"]

let initBranches = ["cse", "ece"]

const EditableInput = ({content, changeContent})=>{

    const [isEditing, setIsEditing] = useState(false);

    return (
        isEditing ? (
            <>
                <input type="text" value={content} onChange={(e)=>{
                    changeContent(e.target.value)
                }} /> <button onClick={()=>setIsEditing(false)}><Check/></button>
            </>
        ):(
            <div className="editable" onClick={()=>setIsEditing(true)}>{content}</div>
        )
    )
}

const RoomButton = ({roomName}) => {

    const [editable, setEditable] = useState(false)

    return (<div style={{padding:5+'px', border:'2px solid black'}}> {roomName}  <button>Edit</button></div>)

}

const ClassBlock = ({start, end, subjectcode, rooms, changeStart, changeEnd, changeSubjectCode})=>{
    return(
        <li className='classblock'>
            <div className="element startend">
                <div className="label">Timing: </div>
                <EditableInput content={start} changeContent={changeStart}/>
                <div className="label"><ArrowRight /></div>
                
                <EditableInput content={end} changeContent={changeEnd}/>
            </div>
            <div className="element subjectcode">
                <div className="label">Subject Code: </div>
                <EditableInput content={subjectcode} changeContent={changeSubjectCode}/>
            </div>
            <div className="element rooms">
                <div className="label">Rooms: </div>
                {rooms.map( (room)=><EditableInput content={room}/>)} <button>New</button><br />
            </div>
        </li>
    )
}


const TimetableForm = () => {

    const [schedule, setSchedule] = useState(sem3)
    
    const [selectedDay, setSelectedDay] = useState(days[0])
    const [branches, setBranches] = useState(initBranches)
    const [selectedBranch, setSelectedBranch] = useState(0)

    let currentSchedule = schedule[branches[selectedBranch]][selectedDay]
    
    function changeClassBlockProperty(propName, newPropValue, index, branch, day){
        let scheduleD = {...schedule};
        scheduleD[branch][day][index][propName] = newPropValue;
        setSchedule(scheduleD)
    }


    function changeClassBlockPropertyArray(propName, newPropValue, index, branch, day){
        let scheduleD = {...schedule};
        scheduleD[branch][day][index][propName] = newPropValue;
        setSchedule(scheduleD)
    }

    return (
        <div>


            <button onClick={
                ()=>{
                    console.log(currentSchedule);   
                    
                }
            }>LOG</button>
            Branch name: 
            <input type="text" value={branches[selectedBranch]} onChange={(e)=>{
                setBranches(branches.map((val,ind)=>{
                    if(ind==selectedBranch) return e.target.value
                    else return val
                }))
            }}/><br/>
            <select value={branches[selectedBranch]} onChange={(e)=>{
                setSelectedBranch(branches.indexOf(e.target.value))
            }}>
                {branches.map((branch) => <option value={branch} > {branch} </option> )}
            </select>
            <select value={selectedDay} onChange={(e)=>{
                setSelectedDay(e.target.value)
            }}>
                { days.map( (day) => <option value={day} > {day} </option>  ) }
            </select>
            <ul className='classblockcontainer'>
                {currentSchedule.map((obj,ind)=>{
                    return(
                        <ClassBlock 
                            start={obj.start} 
                            end={obj.end} 
                            subjectcode={obj.subjectcode} 
                            rooms={obj.rooms}
                            changeStart={(value)=>changeClassBlockProperty("start",value, ind, branches[selectedBranch], selectedDay)}
                            changeEnd={(value)=>changeClassBlockProperty("end",value, ind, branches[selectedBranch], selectedDay)}
                            changeSubjectCode={(value)=>changeClassBlockProperty("subjectcode",value,ind,branches[selectedBranch],selectedDay)}
                            
                            
                        />
                    )
                })}
            </ul>


        </div>
    )
}

export default TimetableForm
