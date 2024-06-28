import React from "react";
import "./Sidebar.css";
import { useState } from "react";
import Setting from "../../Pages/Setting/Setting";
import Analytics from "../../Pages/Analytics/Analytics";
import Dashboard from "../Dashboard/Dashboard";
import Delet from "../popups/delete/Delet";
// import Router from '../../Routing/Router';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Board");
  const [logout, setLogOut] = useState(false);

  const sidebarlist = [
    { name: "Board", icon: "./sidebar2.svg", path: "/home" },
    { name: "Analytics", icon: "./sidebar3.svg", path: "/analytics" },
    { name: "Settings", icon: "./sidebar4.svg", path: "/settings" },
  ];

  const handleLogout = () => {
    setLogOut(true);

  };

  const Logout = () => {
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
    navigate("/");
  };
  
  const handleLogoutclose = () => {
    setLogOut(false);
  };

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
      <div className="sidebar">
        <div className="sidebar-list">
          <div className="promange ">
            <img src="./sidebar1st.svg" alt="" />
            <p className="protext">Pro Manage</p>
          </div>
          {/* <ul className=""> */}
          {sidebarlist.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-item ${
                activeItem === item.name ? "active" : ""
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <img
                src={item.icon}
                alt={`${item.name} icon`}
                className="sidebar-icon"
              />
              <span
                className={`sidebar-name ${
                  activeItem === item.name ? "active" : ""
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
          {/* </ul> */}
        </div>
        <div className="logout" onClick={handleLogout}>
          <img src="./Logout.svg" alt="" className="sidebar-icon  icon  " />
          <span className="sidebar-logout">Logout</span>
        </div>
      </div>
      <div className="allcontentrandring">
        {renderContent()}
        {/* <Router></Router> */}
      </div>

      {logout && (
        <div>
          <Delet text="Logout" onClose={handleLogoutclose} onConfirm={Logout}></Delet>
        </div>
      )}
    </>
  );
};

export default Sidebar;
