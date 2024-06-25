

import React from 'react';
import './Analytics.css';
import { useSelector } from 'react-redux';

const Analytics = () => {
    const allTasks = useSelector(state => state.todo.tasks);

    const backlogTasks = allTasks.filter(task => task.status === 'backlog').length;
    const todoTasks = allTasks.filter(task => task.status === 'to-do').length;
    const inProgressTasks = allTasks.filter(task => task.status === 'inProgress').length;
    const doneTasks = allTasks.filter(task => task.status === 'done').length;
    const lowPriority = allTasks.filter(task => task.priority === 'low').length;
    const moderatePriority = allTasks.filter(task => task.priority === 'moderate').length;
    const highPriority = allTasks.filter(task => task.priority === 'high').length;

    // Filter tasks with a due date that is today
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const dueTodayTasks = allTasks.filter(task => {
        const dueDate = new Date(task.dueDate).setHours(0, 0, 0, 0);
        return dueDate === currentDate;
    }).length;

    return (
        <>
            <p className='Analytics'>Analytics</p>
            <div className='analyticmaincontent'>
                <div className='analyticback'>
                    <div className='analyticinnercontent'>
                        <div className='analyticinnerbox'>
                            <div className='analyticscircle'></div>
                            <p className='analyticstext'>Backlog Tasks</p>
                        </div>
                        <p className='analyticscouting'>{backlogTasks}</p>
                    </div>
                    <div className='analyticinnercontent'>
                        <div className='analyticinnerbox'>
                            <div className='analyticscircle'></div>
                            <p className='analyticstext'>To-do Tasks</p>
                        </div>
                        <p className='analyticscouting'>{todoTasks}</p>
                    </div>
                    <div className='analyticinnercontent'>
                        <div className='analyticinnerbox'>
                            <div className='analyticscircle'></div>
                            <p className='analyticstext'>In-Progress Tasks</p>
                        </div>
                        <p className='analyticscouting'>{inProgressTasks}</p>
                    </div>
                    <div className='analyticinnercontent'>
                        <div className='analyticinnerbox'>
                            <div className='analyticscircle'></div>
                            <p className='analyticstext'>Completed Tasks</p>
                        </div>
                        <p className='analyticscouting'>{doneTasks}</p>
                    </div>
                </div>
                <div className='analyticback'>
                    <div className='analyticinnercontent'>
                        <div className='analyticinnerbox'>
                            <div className='analyticscircle'></div>
                            <p className='analyticstext'>Low Priority</p>
                        </div>
                        <p className='analyticscouting'>{lowPriority}</p>
                    </div>
                    <div className='analyticinnercontent'>
                        <div className='analyticinnerbox'>
                            <div className='analyticscircle'></div>
                            <p className='analyticstext'>Moderate Priority</p>
                        </div>
                        <p className='analyticscouting'>{moderatePriority}</p>
                    </div>
                    <div className='analyticinnercontent'>
                        <div className='analyticinnerbox'>
                            <div className='analyticscircle'></div>
                            <p className='analyticstext'>High Priority</p>
                        </div>
                        <p className='analyticscouting'>{highPriority}</p>
                    </div>
                    <div className='analyticinnercontent'>
                        <div className='analyticinnerbox'>
                            <div className='analyticscircle'></div>
                            <p className='analyticstext'>Due Today Tasks</p>
                        </div>
                        <p className='analyticscouting'>{dueTodayTasks}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;
