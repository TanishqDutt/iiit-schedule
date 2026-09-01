import React, { useState } from 'react'
// import sem3 from '../data/sem3'
import allSem from '../data/allSem'
import ClassBlock from '../data/classBlock' ;


import { ArrowRight, Check, X } from 'lucide-react'

let days = ["mon", "teus", "wed", "thurs", "fri", "sat"]

let initBranches = ["Sec-a", "Sec-b"]


const EditableInput = ({ content, setContent, canDelete = false, deleteContent }) => {

    const [isEditing, setIsEditing] = useState(false);

    return (
        isEditing ? (
            <>
                <input type="text" value={content} onChange={
                    (e) => {
                        setContent(e.target.value)
                    }
                } />
                {canDelete && <button onClick={() => { setIsEditing(false); deleteContent(); }}><X /></button>}
                <button onClick={() => setIsEditing(false)}><Check /></button>
            </>
        ) : (
            <div className="editable" onClick={() => setIsEditing(true)}>{content}</div>
        )
    )
}


const EditableSelect = ({content, setContent, contentArray}) => {
    return (
        <select value={content} onChange={(e)=>{
            setContent(e.target.value)
        }}>
            {contentArray.map((value, ind)=>{
                return <option value={value} key={ind}>{value}</option>
            })}
        </select>
    )
}


const ClassBlockContainer = ({ start, end, subjectcode,teacher , rooms, onChange, deleteClassBlock }) => {
    return (
        <li className='classblock'>
            <button style={{ color: 'red' }}
                onClick={deleteClassBlock}
            >DELETE CLASS</button>
            <div className="element startend">
                <div className="label">Timing: </div>
                <EditableInput content={start} setContent={(value) => { onChange('start', value) }} />
                <div className="label"><ArrowRight /></div>

                <EditableInput content={end} setContent={(value) => { onChange('end', value) }} />
            </div>
            <div className="element subjectcode">
                <div className="label">Subject Code: </div>
                {/* <EditableInput content={subjectcode} setContent={(value) => { onChange('subjectcode', value) }} /> */}
                <EditableSelect content={subjectcode} contentArray={allSem.subjectcodes} setContent={(value) => { onChange('subjectcode', value) }} />
            </div>
            <div className="element teacher">
                <div className="label">Teacher: </div>
                {/* <EditableInput content={teacher} setContent={(value)=>onChange('teacher', value)}/> */}

                <EditableSelect content={teacher} contentArray={allSem.teachers} setContent={(value)=>{onChange('teacher', value)}}/>


            </div>
            <div className="element rooms">
                <div className="label">Rooms: </div>
                {rooms.map((room, ind) => <EditableInput content={room} key={ind} setContent={(value) => {
                    onChange('rooms', rooms.map((r, i) => {
                        return i == ind ? value : r
                    }))
                }} canDelete={true} deleteContent={() => {
                    onChange('rooms', rooms.filter((r, i) => {
                        return i != ind
                    }))
                }} />)}
                <button onClick={() => {
                    onChange('rooms', [...rooms, `NEW-ROOM ${rooms.length + 1}`])
                }}>New</button><br />
            </div>
        </li>
    )
}


const TimetableForm = () => {

    const [selectedDay, setSelectedDay] = useState(0)
    const [selectedBranch, setSelectedBranch] = useState(0)
    const [currentSchedule, setCurrentSchedule] = useState([])

    function changeClassProperty(id, propertyName, value) {
        let newSchedule = currentSchedule.map((obj) => {
            if (obj.id == id) {
                let copyObj = { ...obj }
                copyObj[propertyName] = value
                return copyObj
            }
            else {
                return obj
            }
        })

        setCurrentSchedule(newSchedule)
    }

    function addNewClassBlock(isTheory = true) {
        let newClass = new ClassBlock();

        newClass.day = days[selectedDay]
        newClass.branch = initBranches[selectedBranch]
        newClass.id = Date.now()

        if (isTheory && newClass.branch == 'Sec-a') {
            newClass.rooms = ['G01']
        }
        else if (isTheory && newClass.branch == 'Sec-b') {
            newClass.rooms = ['G02']
        }
        else if (!isTheory) {
            newClass.rooms = ['201', '202', '207']
        }

        setCurrentSchedule([...currentSchedule, newClass])

    }


    return (
        <div>


            <button onClick={
                () => {
                    console.log(JSON.stringify(currentSchedule));
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

            <button onClick={() => {
                addNewClassBlock(true)
            }}>New Theory Class</button>

            <button onClick={() => {
                addNewClassBlock(false)
            }}>New Practical Class</button>


            <ul className='classblockcontainer'>
                {
                    currentSchedule
                        .filter((obj) => obj.branch == initBranches[selectedBranch] && obj.day == days[selectedDay])
                        .map((obj, ind) => {
                            return (
                                <ClassBlockContainer
                                    {...obj}
                                    key={obj.id}
                                    onChange={(parameter, value) => { changeClassProperty(obj.id, parameter, value) }}
                                    deleteClassBlock={() => {
                                        setCurrentSchedule(currentSchedule.filter((c) => c.id != obj.id))
                                    }}
                                />
                            )
                        })
                }
            </ul>

        </div>
    )
}

export default TimetableForm
