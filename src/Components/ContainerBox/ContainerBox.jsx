import React, { useState } from "react";
import "./ContainerBox.css";
import TaskPopup from "../Popup/TaskPopup";
import Delet from "../popups/delete/Delet";
// import Add from "add.svg"

import { useDispatch } from "react-redux";
import {
  removeTask,
  updateTaskStatus,
  updateChecklistChecked,
} from "../../Features/slice";
import { fetchAnalytics, fetchTasks, updateTask } from "../../Features/thunk";
import { toast } from "react-toastify";
import { deleteData } from "../../api";

const ContainerBox = ({ name, img, data }) => {
  const [addpopup, setAddPopup] = useState(false);
  const [editpopup, setEditPopup] = useState(false); // State for edit popup
  const [taskToEdit, setTaskToEdit] = useState(null); // State to hold task data for editing
  const [deletepopup, setDeletePopup] = useState(false);
  const [sharepopup, setSharepopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [collapsedTasks, setCollapsedTasks] = useState([]); // State to store collapsed tasks
  const dispatch = useDispatch();

  const handleAddPopup = () => setAddPopup(true);
  const closePopup = () => {
    setAddPopup(false);
    setEditPopup(false); // Close edit popup when adding new task
  };
  const handleEditPopup = (task) => {
    setTaskToEdit(task);
    setEditPopup(true);
  };
  const handleDelete = async (taskId) => {
    setTaskToDelete(taskId);
    setDeletePopup(true);
  };

  const handleDeleteClose = () => {
    setDeletePopup(false);
    setTaskToDelete(null);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      try {
         await deleteData(`/task/delete/${taskToDelete}`);
         dispatch(fetchTasks())
        toast.success("Task deleted successfully");

      } catch (err) {
        toast.error("Task deleted Failed", err);
      }
    }
    setDeletePopup(false);
    setTaskToDelete(null);
  };

  const changeTaskStatus = (taskId, newStatus, task) => {
    console.log(taskId, newStatus, task);
    dispatch(updateTask({ ...task, id: taskId, status: newStatus }))
      .then((res) => {
        console.log(res);
        if (res.error) {
          toast.error(res.payload.message);
        } else {
          dispatch(fetchTasks());
          dispatch(fetchAnalytics());
          //   closePopup();
        }
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
      });
  };

  const updateChecklistItem = (taskId, checked, item, task) => {
    const updatedChecklist = task.checklist.map((checklistItem) => {
      if (checklistItem._id === item._id) {
        return {
          ...checklistItem,
          isChecked: checked,
        };
      }
      return checklistItem;
    });

    // Create the updated task object with the updated checklist
    const updatedTask = {
      ...task,
      checklist: updatedChecklist,
    };

    dispatch(updateTask({ ...updatedTask, id: taskId }))
      .then((res) => {
        if (res.error) {
          toast.error(res.payload.message);
        } else {
          dispatch(fetchTasks());
          dispatch(fetchAnalytics());

          //   closePopup();
        }
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  const currentDate = new Date(); // Get current date

  const toggleCollapse = (taskId) => {
    if (collapsedTasks.includes(taskId)) {
      setCollapsedTasks(collapsedTasks.filter((id) => id !== taskId));
    } else {
      setCollapsedTasks([...collapsedTasks, taskId]);
    }
    console.log(collapsedTasks);
  };
  const handleAllColaps = () => {
    setCollapsedTasks(data);
    console.log(collapsedTasks);
  };

  const closeSharepopup = () => {
    setSharepopup(false);
  };
  return (
    <>
      <div  className="containerbox" >
        <div className="container-header">
          <p className="containertext">{name}</p>
          <div className="addimg">
            {img && name === "To do" && (
              <img
                src={img}
                alt="Add Task"
                onClick={handleAddPopup}
                className="addtaskpopupopen"
              />
            )}
            <img
              src="./collpas.svg"
              alt="Collapse"
              className="collpasbtn"
              onClick={handleAllColaps}
            />
          </div>
        </div>
        <div className=" ">
          {data.map((task) => (
            <div className="container-content" key={task._id}>
              <div className="task-content">
                <div className="container-header">
                  <div className="highbox">
                    <div className="circle" style={{backgroundColor:`${task.priority == "high"?"#FF2473": task.priority=="moderate"?"#18B0FF":"#63C05B"}`}}></div>
                    <span className="high" >{task.priority.toUpperCase()} PRIORITY</span>
                  </div>
                  <div className="ppp">
                    <img
                      src="./dashdot.svg"
                      alt="Options"
                      onClick={() => setSharepopup(true)}
                      className="dashdot"
                    />
                    {sharepopup && (
                      <div
                        className="sharepopop"
                        onClick={() => setSharepopup(false)}
                      >
                        <p
                          onClick={() => handleEditPopup(task)}
                          className="editbtn"
                        >
                          Edit
                        </p>
                        <p className="sharepopopbtns">Share</p>
                        <p
                          className="delteeshare"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <p className="herosection">{task.title}</p>

                <div className="container-header">
                  <p className="checklisttext">
                    Checklist (
                    {task.checklist.filter((item) => item.isChecked).length}/
                    {task.checklist.length})
                  </p>
                  <div
                    className="arrowbox"
                    onClick={() => toggleCollapse(task.id)}
                  >
                    <img
                      src={
                        collapsedTasks.includes("all")
                          ? "./dasharrow.svg"
                          : "./downarrow.svg"
                      }
                      alt={
                        collapsedTasks.includes("all") ? "Expand" : "Collapse"
                      }
                    />
                  </div>
                </div>

                {collapsedTasks.includes(task.id) && (
                  <div className="checklist">
                    {task.checklist.map((item, index) => (
                      <div className="innerbox" key={index}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={item.isChecked}
                          onChange={() =>
                            updateChecklistItem(
                              task._id,
                              !item.isChecked,
                              item,
                              task
                            )
                          }
                        />
                        <p className="innerboxtext">{item.title}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="allbtns">
                  {task.dueDate ? (
                    <div
                      className="dateinner"
                      style={{
                        backgroundColor:
                          new Date(task.dueDate) < currentDate &&
                          task.status === "done"
                            ? "green"
                            : "red",
                      }}
                    >
                      <p>{formatDate(task.dueDate)}</p>
                    </div>
                  ) : (
                    <div className="dateinner"></div>
                  )}

                  <div className="prioritybtns">
                    {task.status !== "backlog" && (
                      <div
                        className="btnspriorty"
                        onClick={() =>
                          changeTaskStatus(task._id, "backlog", task)
                        }
                      >
                        <p>BACKLOG</p>
                      </div>
                    )}
                    {task.status !== "todo" && (
                      <div
                        className="btnspriorty"
                        onClick={() => changeTaskStatus(task._id, "todo", task)}
                      >
                        <p>TO-DO</p>
                      </div>
                    )}
                    {task.status !== "in-progress" && (
                      <div
                        className="btnspriorty"
                        onClick={() =>
                          changeTaskStatus(task._id, "in-progress", task)
                        }
                      >
                        <p>IN PROGRESS</p>
                      </div>
                    )}
                    {task.status !== "done" && (
                      <div
                        className="btnspriorty"
                        onClick={() => changeTaskStatus(task._id, "done", task)}
                      >
                        <p>DONE</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {addpopup && <TaskPopup closePopup={closePopup} />}
      {editpopup && (
        <TaskPopup closePopup={() => setEditPopup(false)} task={taskToEdit} />
      )}
      {deletepopup && (
        <Delet
          onClose={handleDeleteClose}
          onConfirm={confirmDelete}
          text="delete this task"
        />
      )}
    </>
  );
};

export default ContainerBox;
