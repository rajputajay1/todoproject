import React, { useState } from 'react';
import "./Dashboard.css";
import ContainerBox from '../ContainerBox/ContainerBox';
import PeopleAdded from '../popups/peopleAdded/PeopleAdded';
import { useSelector } from 'react-redux';
import Add from "../../../public/add.svg";

const Dashboard = () => {
    const [showAddPeoplePopup, setShowAddPeoplePopup] = useState(false);
    const [week, setWeek] = useState(false);

    const handleWeek = () => setWeek(true);
    const handleCloseWeek = () => setWeek(false);
    const handleAddPeople = () => setShowAddPeoplePopup(true);
    const handleCloseAddPeoplePopup = () => setShowAddPeoplePopup(false);

    function formatDate() {
        const date = new Date();
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
    
        const suffix = getDaySuffix(day);
    
        return `${day}${suffix} ${month}, ${year}`;
    }
    
    function getDaySuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    
  

    


    const Alltasks = useSelector(state => state.todo.tasks);


    const backlogTasks = Alltasks.filter(task => task.status === 'backlog');
    const todoTasks = Alltasks.filter(task => task.status === 'to-do');
    const inProgressTasks = Alltasks.filter(task => task.status === 'inProgress');
    const doneTasks = Alltasks.filter(task => task.status === 'done');

    return (
        <>
            <div className='dashboard-content'>
                <header className='upertextfixed'>
                    <div className='dashborad-header'>
                        <p className='welcome'>Welcome! Kumar</p>
                        <p className='date'>{formatDate()}</p>
                    </div>
                    <div className='dashborad-header'>
                        <div className='boardwithtext'>
                            <p className='sidebartext-dashboard'>Board</p>
                            <p className='addpeople' onClick={handleAddPeople}>
                                <img src="./dashboard.svg" alt="Add People" />
                                <span className='addtext'>Add People</span>
                            </p>
                        </div>
                        <p className='week' onClick={handleWeek}>
                            This week <span><img src="./dashboard1.svg" alt="This week" /></span>
                        </p>
                        {week && (
                            <div className='thisweek' onClick={handleCloseWeek}>
                                <p className='thisweektext'>Today</p>
                                <p className='thisweektext'>This Week</p>
                                <p className='thisweektext'>This Month</p>
                            </div>
                        )}
                    </div>
                </header>
                <div className='allcontainerboxes'>
                    <ContainerBox name="Backlog" data={backlogTasks} />
                    <ContainerBox name="To do" data={todoTasks} img={Add} />
                    <ContainerBox name="In progress" data={inProgressTasks} />
                    <ContainerBox name="Done" data={doneTasks} />
                </div>
                {showAddPeoplePopup && <PeopleAdded onclose={handleCloseAddPeoplePopup} />}
            </div>
        </>
    );
};

export default Dashboard;
