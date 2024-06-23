import React from 'react';
import './Sidebar.css';
import { useState } from 'react';
import Setting from '../../Pages/Setting/Setting';
import Analytics from '../../Pages/Analytics/Analytics';
import Dashboard from '../Dashboard/Dashboard';
import Delet from '../popups/delete/Delet';

const Sidebar = () => {

    const [activeItem, setActiveItem] = useState("Board");
    const [logout, setLogOut] = useState(false)

    const sidebarlist = [

        {
            name: "Board",
            icon: "./sidebar2.svg"
        },
        {
            name: "Analytics",
            icon: "./sidebar3.svg"
        },
        {
            name: "Settings",
            icon: "./sidebar4.svg"
        }
    ];


    const handleLogout = () => {
        setLogOut(true)
    }

    const handleLogoutclose = () => {
        setLogOut(false)
    }

    const renderContent = () => {
        switch (activeItem) {

            case "Board":
                return <Dashboard />;
            case "Analytics":
                return <Analytics />;
            case "Settings":
                return <Setting />;
            default:
                return <Dashboard />;
        }
    };
    return (
        <>

            <div className='sidebar'>
                <div className='sidebar-list'>


                    <div className='promange '>
                        <img src="./sidebar1st.svg" alt="" />
                        <p className='protext'>Pro Manage</p>
                    </div>
                    {/* <ul className=""> */}
                    {sidebarlist.map((item, index) => (
                        <li
                            key={index}
                            className={`sidebar-item ${activeItem === item.name ? 'active' : ''}`}
                            onClick={() => setActiveItem(item.name)}
                        >
                            <img src={item.icon} alt={`${item.name} icon`} className="sidebar-icon" />
                            <span
                                className={`sidebar-name ${activeItem === item.name ? 'active' : ''}`}

                            >{item.name}</span>
                        </li>
                    ))}
                    {/* </ul> */}
                </div>
                <div className='logout' onClick={handleLogout}>
                    <img src="./Logout.svg" alt="" className="sidebar-icon  icon  " />
                    <span className="sidebar-logout">Logout</span>
                </div>
            </div>
            <div className="allcontentrandring">
                {renderContent()}
            </div>

            {logout &&
                (
                    <div>
                        <Delet  text="Logout" onClose={handleLogoutclose}></Delet>
                    </div>
                )
            }
        </>
    );
};

export default Sidebar;
