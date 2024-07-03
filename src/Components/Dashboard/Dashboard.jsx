import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import ContainerBox from "../ContainerBox/ContainerBox";
import PeopleAdded from "../popups/peopleAdded/PeopleAdded";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirection
import { toast } from "react-toastify"; // Import toast from react-toastify for displaying messages
import "react-toastify/dist/ReactToastify.css"; // Import the default CSS for toastify
import Add from "../../../public/add.svg";
import Sidebar from "../Sidebar/Sidebar";
import { fetchAnalytics, fetchTasks } from "../../Features/thunk";
import { updateFilter } from "../../Features/slice";

const Dashboard = () => {
  const [showAddPeoplePopup, setShowAddPeoplePopup] = useState(false);
  const [week, setWeek] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useHistory hook for navigation
  const filter = useSelector((state) => state.todo.filter);
  const [selectedweekoption, setSelectedWeekoption] = useState(filter);

  const handleoptionWeek = (Options) => {
    dispatch(updateFilter(Options))
    setSelectedWeekoption(Options);
    setWeek(false);
    console.log(Options);
    navigate(`/home?filter=${Options}`);

  };

  useEffect(()=>{
    dispatch(fetchTasks(filter))

  },[filter])

  const handleWeek = () => setWeek(true);
  const handleCloseWeek = () => setWeek(false);
  const handleAddPeople = () => setShowAddPeoplePopup(true);
  const handleCloseAddPeoplePopup = () => setShowAddPeoplePopup(false);

  function formatDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const suffix = getDaySuffix(day);

    return `${day}${suffix} ${month}, ${year}`;
  }

  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const Alltasks = useSelector((state) => state.todo.tasks);
  console.log(Alltasks)
  const backlogTasks = Alltasks.filter((task) => task._id === "backlog")[0]?.tasks || [];
  const todoTasks = Alltasks.filter((task) => task._id === "todo")[0]?.tasks || [];
  const inProgressTasks = Alltasks.filter(
    (task) => task._id === "in-progress"
  )[0]?.tasks || [];
  const doneTasks = Alltasks.filter((task) => task._id === "done")[0]?.tasks || [];

  useEffect(() => {
    dispatch(fetchTasks(filter))
    dispatch(fetchAnalytics())
    
  }, []);

  return (
    <>
      <div className="dashboard-content">
        <header className="upertextfixed">
          <div className="dashborad-header">
            <p className="welcome">Welcome! Kumar</p>
            <p className="date">{formatDate()}</p>
          </div>
          <div className="dashborad-header">
            <div className="boardwithtext">
              <p className="sidebartext-dashboard">Board</p>
              <p className="addpeople" onClick={handleAddPeople}>
                <img src="./dashboard.svg" alt="Add People" />
                <span className="addtext">Add People</span>
              </p>
            </div>
            <p className="week" onClick={handleWeek}>
              {selectedweekoption=="week"?"This Week":selectedweekoption=="today"?"Today":"This Month"}{" "}
              <span>
                <img src="./dashboard1.svg" alt="This week" />
              </span>
            </p>
            {week && (
              <div className="thisweek" onClick={handleCloseWeek}>
                <p
                  className="thisweektext"
                  onClick={() => handleoptionWeek("today")}
                >
                  Today
                </p>
                <p
                  className="thisweektext"
                  onClick={() => handleoptionWeek("week")}
                >
                  This Week
                </p>
                <p
                  className="thisweektext"
                  onClick={() => handleoptionWeek("monthly")}
                >
                  This Month
                </p>
              </div>
            )}
          </div>
        </header>
        <div className="allcontainerboxes">
          <ContainerBox name="Backlog" data={backlogTasks} />
          <ContainerBox name="To do" data={todoTasks} img={Add} />
          <ContainerBox name="In progress" data={inProgressTasks} />
          <ContainerBox name="Done" data={doneTasks} />
        </div>
        {showAddPeoplePopup && (
          <PeopleAdded onclose={handleCloseAddPeoplePopup} />
        )}
      </div>
    </>
  );
};

export default Dashboard;
