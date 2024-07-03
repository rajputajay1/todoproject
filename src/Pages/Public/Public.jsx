import React from 'react';
import "./Public.css"

const Public = () => {
    const task = {
        name: 'lakshay',
        priority: 'HIGH PRIORITY',
        checklist: [
            { name: 'rahul', checked: true },
            { name: 'ajauy', checked: false },
            { name: 'sahil', checked: false },
            { name: 'fghf', checked: false },
        ],
        dueDate: 'Jun 17',
    };

    return (
        <div className="pro-manage">
       
                <div className='public-box'>
           
                <img src="./sidebar1st.svg" alt="" />
                    <p className="public-protext">Pro Manage</p>
                             
              </div>
              
       
            <main className="main">
                <div className="task-card">
                    <div className="priority">
                        <span className="priority-dot"></span>
                        <p  className='public-priority '>
                        {task.priority}
                        </p>  
                    </div>
                    <h2 className=" public-task-name">{task.name}</h2>
                    <div className="public-checklist">
                        <p className="checklist-header">
                            Checklist ({task.checklist.filter(item => item.checked).length}/{task.checklist.length})
                        </p>
                        {task.checklist.map((item, index) => (
                            <div key={index} className="public-checklist-item">
                                <div className={`public-checkbox ${item.checked ? 'checked' : ''}`}></div>
                                <div className="public-checklist-input">{item.name}</div>
                            </div>
                        ))}
                    </div>
                    <div className="public-due-date">
                        <span>Due Date</span>
                        <span className="public-date">{task.dueDate}</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Public;
