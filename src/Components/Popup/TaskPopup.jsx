
import React, { useState } from 'react';
import './TaskPopup.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { addTasks } from '../../Features/TodoSlice';
import { nanoid } from '@reduxjs/toolkit';

const TaskPopup = ({ closePopup }) => {
    const [prioritybtn, setPriorityBtn] = useState('');
    const [input, setInput] = useState('');
    const [assine, setAssine] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [checklist, setChecklist] = useState([]);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handlebtn = (priority) => {
        setPriorityBtn(priority);
    };

    const addTask = () => {
        setChecklist([...checklist, { task: '', completed: false }]);
    };

    const deleteTask = (index) => {
        const updatedChecklist = checklist.filter((_, i) => i !== index);
        setChecklist(updatedChecklist);
    };

    const handleTaskChange = (index, value) => {
        const updatedChecklist = checklist.map((item, i) =>
            i === index ? { ...item, task: value } : item
        );
        setChecklist(updatedChecklist);
    };

    const handleCheckboxChange = (index) => {
        const updatedChecklist = checklist.map((item, i) =>
            i === index ? { ...item, completed: !item.completed } : item
        );
        setChecklist(updatedChecklist);
    };

    const formvalue = () => {
        if (!input.trim()) {
            setError('Title is required.');
            return;
        }

        if (!prioritybtn) {
            setError('Priority is required.');
            return;
        }

        if (checklist.length === 0 || checklist.some(item => !item.task.trim())) {
            setError('At least one subtask is required.');
            return;
        }

        dispatch(
            addTasks({
                id: nanoid(),
                title: input,
                priority: prioritybtn,
                assignee: assine,
                dueDate: dueDate,
                checklist: checklist,
                status: 'to-do',
            })
        );
        closePopup();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p className='tittle'>Title <span className='star'>*</span></p>
                <div>
                    <input
                        type="text"
                        className='todotaskinput'
                        placeholder='Enter Task Title'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className='taskbtns'>
                    <p className='tittle'>Select Priority <span className='star'>*</span></p>
                    <div
                        className={`taskhighpriority ${prioritybtn === 'high' ? 'selected' : ''}`}
                        onClick={() => handlebtn('high')}
                    >
                        <div className='taskcirclehigh'></div>
                        <p className='tittle'>HIGH PRIORITY</p>
                    </div>
                    <div
                        className={`taskhighpriority ${prioritybtn === 'moderate' ? 'selected' : ''}`}
                        onClick={() => handlebtn('moderate')}
                    >
                        <div className='taskcirclemid'></div>
                        <p className='tittle'>MODERATE PRIORITY</p>
                    </div>
                    <div
                        className={`taskhighpriority ${prioritybtn === 'low' ? 'selected' : ''}`}
                        onClick={() => handlebtn('low')}
                    >
                        <div className='taskcirclelow'></div>
                        <p className='tittle'>LOW PRIORITY</p>
                    </div>
                </div>
                <div className='assinetask'>
                    <p className='tittle'>Assign to</p>
                    <input
                        type="text"
                        className='todotaskinput'
                        placeholder='Add an assignee'
                        value={assine}
                        onChange={(e) => setAssine(e.target.value)}
                    />
                </div>
                <p className='tittle'>Checklist <span className='star'>*</span></p>
                <div className='mainaddtasktodo'>
                    {checklist.map((item, index) => (
                        <div className='taskItem' key={index}>
                            <input
                                type="checkbox"
                                className='inputcheckboxtodostart'
                                checked={item.completed}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <input
                                type="text"
                                placeholder='Add a task'
                                className='ajay'
                                value={item.task}
                                onChange={(e) => handleTaskChange(index, e.target.value)}
                            />
                            <img
                                src="./Delete.svg"
                                alt="Delete"
                                className='inputcheckboxtodoend'
                                onClick={() => deleteTask(index)}
                            />
                        </div>
                    ))}
                </div>
                <div className='addbtntask'>
                    <div onClick={addTask} className='addbtntask'>
                        <img src="./addbtn.svg" alt="" />
                        <p className='addnewtask'>Add New</p>
                    </div>
                </div>
                {error && <p className='error'>{error}</p>}
                <div className='threebtntask'>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        className='datebtntask'
                        placeholderText='Select Due Date'
                    />
                    <div className='savecanclebtn'>
                        <div className='canclebtntask' onClick={closePopup}>Cancel</div>
                        <div className='savebtntask' onClick={formvalue}>Save</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskPopup;
