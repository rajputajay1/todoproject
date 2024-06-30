import React from "react";
import "./Analytics.css";
import { useSelector } from "react-redux";

const Analytics = () => {
  const allTasks = useSelector((state) => state.todo.analytics);
console.log(allTasks)
  const backlogTasks = allTasks.stateCounts?.backlog || 0;
  const todoTasks = allTasks.stateCounts?.todo || 0;
  const inProgressTasks = allTasks.stateCounts['in-progress'] || 0;
  const doneTasks = allTasks.stateCounts?.done || 0;
  const lowPriority = allTasks?.priorityCounts?.low || 0;
  const moderatePriority = allTasks.priorityCounts?.moderate || 0;
  const highPriority = allTasks.priorityCounts?.high || 0;

  // Filter tasks with a due date that is today
  // const currentDate = new Date().setHours(0, 0, 0, 0);
  const dueTodayTasks = allTasks.dueDateCount;

  return (
    <>
      <div className="analytic-container-box">
      <p className="Analytics">Analytics</p>
      <div className="analyticmaincontent">
        <div className="analyticback">
          <div className="analyticinnercontent">
            <div className="analyticinnerbox">
              <div className="analyticscircle"></div>
              <p className="analyticstext">Backlog Tasks</p>
            </div>
            <p className="analyticscouting">{backlogTasks}</p>
          </div>
          <div className="analyticinnercontent">
            <div className="analyticinnerbox">
              <div className="analyticscircle"></div>
              <p className="analyticstext">To-do Tasks</p>
            </div>
            <p className="analyticscouting">{todoTasks}</p>
          </div>
          <div className="analyticinnercontent">
            <div className="analyticinnerbox">
              <div className="analyticscircle"></div>
              <p className="analyticstext">In-Progress Tasks</p>
            </div>
            <p className="analyticscouting">{inProgressTasks}</p>
          </div>
          <div className="analyticinnercontent">
            <div className="analyticinnerbox">
              <div className="analyticscircle"></div>
              <p className="analyticstext">Completed Tasks</p>
            </div>
            <p className="analyticscouting">{doneTasks}</p>
          </div>
        </div>
        <div className="analyticback">
          <div className="analyticinnercontent">
            <div className="analyticinnerbox">
              <div className="analyticscircle"></div>
              <p className="analyticstext">Low Priority</p>
            </div>
            <p className="analyticscouting">{lowPriority}</p>
          </div>
          <div className="analyticinnercontent">
            <div className="analyticinnerbox">
              <div className="analyticscircle"></div>
              <p className="analyticstext">Moderate Priority</p>
            </div>
            <p className="analyticscouting">{moderatePriority}</p>
          </div>
          <div className="analyticinnercontent">
            <div className="analyticinnerbox">
              <div className="analyticscircle"></div>
              <p className="analyticstext">High Priority</p>
            </div>
            <p className="analyticscouting">{highPriority}</p>
          </div>
          <div className="analyticinnercontent">
            <div className="analyticinnerbox">
              <div className="analyticscircle"></div>
              <p className="analyticstext">Due Today Tasks</p>
            </div>
            <p className="analyticscouting">{dueTodayTasks}</p>
          </div>
        </div>
        </div>
        </div>
    </>
  );
};

export default Analytics;
