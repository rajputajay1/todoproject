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
            <header className="header">
                <h1>
                    <span role="img" aria-label="cube">🧊</span> Pro Manage
                </h1>
            </header>
            <main className="main">
                <div className="task-card">
                    <div className="priority">
                        <span className="priority-dot"></span>
                        {task.priority}
                    </div>
                    <h2 className="task-name">{task.name}</h2>
                    <div className="checklist">
                        <p className="checklist-header">
                            Checklist ({task.checklist.filter(item => item.checked).length}/{task.checklist.length})
                        </p>
                        {task.checklist.map((item, index) => (
                            <div key={index} className="checklist-item">
                                <div className={`checkbox ${item.checked ? 'checked' : ''}`}></div>
                                <div className="checklist-input">{item.name}</div>
                            </div>
                        ))}
                    </div>
                    <div className="due-date">
                        <span>Due Date</span>
                        <span className="date">{task.dueDate}</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Public;
