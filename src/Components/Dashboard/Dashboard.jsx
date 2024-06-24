import React from 'react'
import "./Dashboard.css"
import ContainerBox from '../ContainerBox/ContainerBox'
import { useState } from 'react'
import Add from "../../../public/add.svg";
import PeopleAdded from '../popups/peopleAdded/PeopleAdded';
import { useSelector } from 'react-redux';
import TodoSlice from '../../Features/TodoSlice';


const Dashboard = () => {

    const [showAddPeoplePopup, setShowAddPeoplePopup] = useState(false);
    const [week, setWeek] = useState(false)



    const handleWeek = () => {
        setWeek(true)
    }
    const handlecloseweek = () => {
        setWeek(false)
    }
    const handleAddPeople = () => {
        setShowAddPeoplePopup(true);
    };

    const handleCloseAddPeoplePopup = () => {
        setShowAddPeoplePopup(false);
    };
    // const todos = useSelector(state => state.todos)





    return (
        <>
            {/* <Sidebar></Sidebar> */}
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
                                <img src="./dashboard.svg" alt="" />
                                <span className='addtext'>Add People</span>
                            </p>
                        </div>

                        <p className='week' onClick={handleWeek}>This week <span> <img src="./dashboard1.svg" alt="" /></span></p>
                        {week && (
                            <div className='thisweek' onClick={handlecloseweek}>
                                <p className='thisweektext'>Today</p>
                                <p className='thisweektext'>This Week</p>
                                <p className='thisweektext'>This Month</p>
                            </div>
                        )}

                    </div>
                </header>


                <div className='allcontainerboxes'>

                    {/* {
                        state.todos.tasks.filter(task => task.status === 'backlog')
                    } */}
                    <ContainerBox name="Backlog" />
                    <ContainerBox name="To do" img={Add} />
                    <ContainerBox name="In progress" />
                    <ContainerBox name="Done" />
                </div>

                {showAddPeoplePopup && (
                    <PeopleAdded onclose={handleCloseAddPeoplePopup} />
                )}
            </div>



        </>
    )
}

export default Dashboard