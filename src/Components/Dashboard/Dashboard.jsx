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
                        <p className='date'>12th Jan, 2024</p>
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
