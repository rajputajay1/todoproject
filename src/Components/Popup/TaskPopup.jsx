import React from 'react';
import './TaskPopup.css';
import { useState } from 'react';

const TaskPopup = ({ closePopup }) => {

    const [prioritybtn, setPriorityBtn] = useState("")
    const [tasks, setTasks] = useState([""]);


    const handlebtn = (priority) => {
        setPriorityBtn(priority)

    }
    const addTask = () => {
        const newTasks = [...tasks, ""];
        setTasks(newTasks);
    };
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p className='tittle'>Title  <span className='star'>*</span></p>
                <div>


                    <input type="text" className='todotaskinput'
                        placeholder='Enter Task Title'
                    />
                </div>
                <div className='taskbtns'>

                    <p className='tittle'>Select Priority   <span className='star'>*</span></p>
                    <div className={`taskhighpriority ${prioritybtn === 'high' ? 'selected' : ''}`}
                        onClick={() => handlebtn('high')}
                    >
                        <div className='taskcirclehigh'></div>
                        <p className='tittle'>HIGH PRIORITY</p>
                    </div>
                    <div className={`taskhighpriority ${prioritybtn === 'mid' ? 'selected' : ''}`}
                        onClick={() => handlebtn('mid')}
                    >
                        <div className='taskcirclemid'></div>
                        <p className='tittle'>MODERATE PRIORITY</p>
                    </div>
                    <div className={`taskhighpriority ${prioritybtn === 'low' ? 'selected' : ''}`}
                        onClick={() => handlebtn('low')}
                    >
                        <div className='taskcirclelow'></div>
                        <p className='tittle'>LOW PRIORITY</p>
                    </div>
                </div>

                <div className='assinetask'>
                    <p className='tittle'>Assign to</p>
                    <input type="text" className='todotaskinput'
                        placeholder='Add a assignee'
                    />
                </div>
                <p className='tittle'>Checklist (1/3) <span className='star'>*</span> </p>
                <div className='mainaddtasktodo'>
                    {tasks.map((task, index) => (
                        <div className='taskItem' key={index}>
                            <input type="checkbox" className='inputcheckboxtodostart' />
                            <input type="text" placeholder='Add a task' className='ajay' />
                            <img src="./Delete.svg" alt="Delete" className='inputcheckboxtodoend' onClick={() => deleteTask(index)} />
                        </div>
                    ))}
                </div>


                <div className='addbtntask'>
                    <div onClick={addTask} className='addbtntask'>


                        <img src="./addbtn.svg" alt="" />
                        <p className='addnewtask'>Add New</p>
                    </div>
                </div>
                <div className='threebtntask'>
                    <div className='datebtntask'>Select Due Date</div>
                    <div className='savecanclebtn'>


                        <div className='canclebtntask' onClick={closePopup}>Cancel</div>
                        <div className='savebtntask'>Save</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TaskPopup;
