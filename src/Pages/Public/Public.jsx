import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Public.css";
import { fetchGetData } from "../../api";
import { toast } from "react-toastify";

const Public = () => {
  const [task, setTask] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    setLoading(true);
    try {
      const data = await fetchGetData(`task/fetchTasks/${id}`);
      console.log(data);
      if (!data.success) {
        toast.error("Failed", data.message);
      } else {
        toast.success(data.message);
        setTask(data.data);
      }
      setLoading(false);

      // console.log(data);
    } catch (err) {
      toast.error("Failed", data.message);
      setLoading(false);
    }
  }, []);
  // const task = {
  //     name: 'lakshay',
  //     priority: 'HIGH PRIORITY',
  //     checklist: [
  //         { name: 'rahul', checked: true },
  //         { name: 'ajauy', checked: false },
  //         { name: 'sahil', checked: false },
  //         { name: 'fghf', checked: false },
  //     ],
  //     dueDate: 'Jun 17',
  // };
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };
  return (
    <div className="pro-manage">
       <div className='public-box'>
           
           <img src="./sidebar1st.svg" alt="" />
               <p className="public-protext">Pro Manage</p>
                        
         </div>
      <main className="main">
        <div className="task-card">
          <div className="priority">
            <span className="priority-dot"></span>
            { task.priority && task.priority.toUpperCase()} PRIORITY{" "}
          </div>
          <h2 className="task-name">{task.title}</h2>
          <div className="checklist">
            {task.checklist && task.checklist.length >= 0 && (
              <p className="checklist-header">
                Checklist (
                {task?.checklist?.filter((item) => item.isChecked).length}/
                {task?.checklist?.length})
              </p>
            )}
            {task.checklist &&
              task.checklist.length >= 0 &&
              task.checklist.map((item, index) => (
                <div key={index} className="checklist-item">
                  <div
                    className={`checkbox ${item.isChecked ? "checked" : ""}`}
                  ></div>
                  <div className="checklist-input">{item.title}</div>
                </div>
              ))}
          </div>
          {task.dueDate && (
            <div className="due-date">
              <span>Due Date</span>
              <span className="date">{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Public;
