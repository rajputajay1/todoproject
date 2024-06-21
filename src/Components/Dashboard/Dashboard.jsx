import React from 'react'
import "./Dashboard.css"
import Sidebar from '../Sidebar/Sidebar'
import ContainerBox from '../ContainerBox/ContainerBox'
import { useState } from 'react'
import  Add  from "../../../public/add.svg";

const Dashboard = () => {

    const [week, setWeek] = useState(false)

    const handleWeek = () => {
        setWeek(true)
    }
    const handlecloseweek = () => {
        setWeek(false)
    }

    return (
        <>
            {/* <Sidebar></Sidebar> */}
            <div className='dashboard-content'>


                <div className='dashborad-header'>
                    <p className='welcome'>Welcome! Kumar</p>
                    <p className='date'>12th Jan, 2024</p>
                </div>
                <div className='dashborad-header'>


                    <div className='boardwithtext'>


                        <p className='sidebartext-dashboard'>Board</p>
                        <p className='addpeople'>
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


                <div className='allcontainerboxes'>


                    <ContainerBox name="Backlog" />
                    <ContainerBox name="To do"img={Add} />
                    <ContainerBox name="In progress"  />
                    <ContainerBox name="Done" />
                </div>
            </div>

        </>
    )
}

export default Dashboard