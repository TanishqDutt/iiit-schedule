import React, { useState } from 'react'
import sem3 from '../data/sem3'
import { ArrowRight, Check } from 'lucide-react'

let days = ["mon", "teus", "wed", "thurs", "fri", "sat"]

let initBranches = ["cse", "ece"]


const EditableInput = ({ content, setContent }) => {

    const [isEditing, setIsEditing] = useState(false);

    return (
        isEditing ? (
            <>
                <input type="text" value={content} onChange={
                    (e)=>{
                        setContent(e.target.value)
                    }
                } /> <button onClick={() => setIsEditing(false)}><Check /></button>
            </>
        ) : (
            <div className="editable" onClick={() => setIsEditing(true)}>{content}</div>
        )
    )
}

const RoomButton = ({ roomName }) => {

    const [editable, setEditable] = useState(false)

    return (<div style={{ padding: 5 + 'px', border: '2px solid black' }}> {roomName}  <button>Edit</button></div>)

}

const ClassBlock = ({ start, end, subjectcode, rooms, onChange }) => {
    return (
        <li className='classblock'>
            <div className="element startend">
                <div className="label">Timing: </div>
                <EditableInput content={start} setContent={(value)=>{onChange('start',value)}}/>
                <div className="label"><ArrowRight /></div>

                <EditableInput content={end} setContent={(value)=>{onChange('end',value)}} />
            </div>
            <div className="element subjectcode">
                <div className="label">Subject Code: </div>
                <EditableInput content={subjectcode} setContent={(value)=>{onChange('subjectcode',value)}} />
            </div>
            <div className="element rooms">
                <div className="label">Rooms: </div>
                {rooms.map((room, ind) => <EditableInput content={room} key={ind} setContent={(value)=>{
                    onChange('rooms', rooms.map((r,i)=>{
                        return i==ind ? value : r
                    }))
                }} />)} 
                <button onClick={()=>{
                    onChange('rooms' , [...rooms, 'NEW-ROOM'])
                }}>New</button><br />
            </div>
        </li>
    )
}


const TimetableForm = () => {

    const [selectedDay, setSelectedDay] = useState(0)
    const [selectedBranch, setSelectedBranch] = useState(0)
    const [currentSchedule, setCurrentSchedule] = useState(sem3.sem3)

    function changeClassProperty(id, propertyName, value){
        let newSchedule = currentSchedule.map((obj) => {
            if(obj.id == id){
                let copyObj = {...obj}
                copyObj[propertyName] = value
                return copyObj
            }
            else{
                return obj
            }
        })

        setCurrentSchedule(newSchedule)
    }

    function addNewClassBlock(){
        let newClass = new sem3.createEmptyClass();
        
        newClass.day = days[selectedDay]
        newClass.branch = initBranches[selectedBranch]
        newClass.id = currentSchedule.length + 1
        
        setCurrentSchedule([...currentSchedule, newClass])
        
    }


    return (
        <div>


            <button onClick={
                () => {
                    console.log(currentSchedule);
                }
            }>LOG</button>

            <select value={selectedBranch} onChange={(e) => {
                setSelectedBranch(Number(e.target.value))
            }}>
                {initBranches.map((branch) => <option value={initBranches.indexOf(branch)} key={initBranches.indexOf(branch)}> {branch} </option>)}
            </select>


            <select value={selectedDay} onChange={(e) => {
                setSelectedDay(Number(e.target.value))
            }}>
                {days.map((day) => <option value={days.indexOf(day)} key={days.indexOf(day)}> {day} </option>)}
            </select>

            <button onClick={()=>{
                addNewClassBlock()
            }}>New Class Block</button>


            <ul className='classblockcontainer'>
                {
                    currentSchedule
                        .filter((obj) => obj.branch == initBranches[selectedBranch] && obj.day == days[selectedDay])
                        .map((obj, ind) => {
                            return (
                                <ClassBlock
                                    {...obj}
                                    key={obj.id}
                                    onChange = {(parameter, value)=>{changeClassProperty(obj.id, parameter, value)}}
                                />
                            )
                        })
                }
            </ul>


        </div>
    )
}

export default TimetableForm
