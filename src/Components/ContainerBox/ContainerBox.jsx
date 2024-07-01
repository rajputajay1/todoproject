
import React, { useState } from "react";
import "./ContainerBox.css";
import TaskPopup from "../Popup/TaskPopup";
import Delet from "../popups/delete/Delet";
import { useDispatch } from "react-redux";
import {
  removeTask,
  updateTaskStatus,
  updateChecklistChecked,
} from "../../Features/slice";
import { fetchAnalytics, fetchTasks, updateTask } from "../../Features/thunk";
import { toast } from "react-toastify";

const ContainerBox = ({ name, img, data }) => {
  const [addpopup, setAddPopup] = useState(false);
  const [editpopup, setEditPopup] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [deletepopup, setDeletePopup] = useState(false);
  const [sharePopupTaskId, setSharePopupTaskId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [collapsedTasks, setCollapsedTasks] = useState([]);
  const dispatch = useDispatch();

  const handleAddPopup = () => setAddPopup(true);
  const closePopup = () => {
    setAddPopup(false);
    setEditPopup(false);
  };

  const handleEditPopup = (task) => {
    setTaskToEdit(task);
    setEditPopup(true);
  };

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
    setDeletePopup(true);
  };

  const handleDeleteClose = () => {
    setDeletePopup(false);
    setTaskToDelete(null);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(removeTask(taskToDelete));
    }
    setDeletePopup(false);
    setTaskToDelete(null);
  };

  const changeTaskStatus = (taskId, newStatus, task) => {
    dispatch(updateTask({ ...task, id: taskId, status: newStatus }))
      .then((res) => {
        if (res.error) {
          toast.error(res.payload.message);
        } else {
          dispatch(fetchTasks());
          dispatch(fetchAnalytics());
        }
      })
      .catch((err) => {
        console.log(err);
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  const currentDate = new Date();

  const toggleCollapse = (taskId) => {
    if (collapsedTasks.includes(taskId)) {
      setCollapsedTasks(collapsedTasks.filter((id) => id !== taskId));
    } else {
      setCollapsedTasks([...collapsedTasks, taskId]);
    }
  };

  const handleAllCollapse = () => {
    if (collapsedTasks.length === data.length) {
      setCollapsedTasks([]); // Expand all tasks
      }
   
  };

  const closeSharepopup = () => {
    setSharePopupTaskId(null);
  };

  return (
    <>
      <div className="containerbox">
        <div className="container-header">
          <p className="containertext">{name}</p>
          <div className="addimg">
            {img && name === "To do" && (
              <img
                src={img}
                alt="Add Task"
                onClick={handleAddPopup}
                className="addtaskpopupopen"
                style={{ cursor: "pointer" }}
              />
            )}
            <img
              src="./collpas.svg"
              alt="Collapse"
              className="collpasbtn"
              onClick={handleAllCollapse}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div>
          {data.map((task) => (
            <div className="container-content" key={task._id}>
              <div className="task-content">
                <div className="container-header">
                  <div className="highbox">
                    <div className="circle"></div>
                  </div>
                  <div className="ppp">
                    <img
                      src="./dashdot.svg"
                      alt="Options"
                      onClick={() => setSharePopupTaskId(task._id)}
                      className="dashdot"
                      style={{ cursor: "pointer" }}
                    />
                    {sharePopupTaskId === task._id && (
                      <div
                        className="sharepopop"
                        onClick={closeSharepopup}
                      >
                        <p
                          onClick={() => handleEditPopup(task)}
                          className="editbtn"
                          style={{ cursor: "pointer" }}
                        >
                          Edit
                        </p>
                        <p className="sharepopopbtns" style={{ cursor: "pointer" }}>Share</p>
                        <p
                          className="delteeshare"
                          onClick={() => handleDelete(task._id)}
                          style={{ cursor: "pointer" }}
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
                    onClick={() => toggleCollapse(task._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        collapsedTasks.includes(task._id)
                          ? "./dasharrow.svg"
                          : "./downarrow.svg"
                      }
                      alt={
                        collapsedTasks.includes(task._id) ? "Expand" : "Collapse"
                      }
                    />
                  </div>
                </div>

                {collapsedTasks.includes(task._id) && (
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
                        style={{ cursor: "pointer" }}
                      >
                        <p>BACKLOG</p>
                      </div>
                    )}
                    {task.status !== "todo" && (
                      <div
                        className="btnspriorty"
                        onClick={() => changeTaskStatus(task._id, "todo", task)}
                        style={{ cursor: "pointer" }}
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
                        style={{ cursor: "pointer" }}
                      >
                        <p>IN PROGRESS</p>
                      </div>
                    )}
                    {task.status !== "done" && (
                      <div
                        className="btnspriorty"
                        onClick={() => changeTaskStatus(task._id, "done", task)}
                        style={{ cursor: "pointer" }}
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
        <TaskPopup task={taskToEdit} closePopup={closePopup} isEdit={true} />
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
