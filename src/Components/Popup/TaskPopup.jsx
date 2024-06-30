import React, { useState, useEffect } from "react";
import "./TaskPopup.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  addTask as addNewTask,
  fetchAnalytics,
  fetchTasks,
  updateTask,
} from "../../Features/thunk";
import { toast } from "react-toastify";
import { fetchGetData } from "../../api";

const TaskPopup = ({ closePopup, task }) => {
  const [prioritybtn, setPriorityBtn] = useState("");
  const [input, setInput] = useState("");
  const [assine, setAssine] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setInput(task.title);
      setPriorityBtn(task.priority);
      setAssine(task?.assignedTo?.email || "");
      setSelectedMember(task?.assignedTo || null);
      setDueDate(task.dueDate ? new Date(task.dueDate) : null);
      setChecklist(task.checklist || []);
    }
  }, [task]);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetchGetData("user/get-all-members", {}, token);
      setMembers(response.data);
    };
    fetchMembers();
  }, []);

  const handlebtn = (priority) => {
    setPriorityBtn(priority);
  };

  const addTask = () => {
    setChecklist([...checklist, { task: "", completed: false }]);
  };

  const deleteTask = (index) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);
  };

  const handleTaskChange = (index, value) => {
    const updatedChecklist = checklist.map((item, i) =>
      i === index ? { ...item, title: value } : item
    );
    setChecklist(updatedChecklist);
  };

  const handleCheckboxChange = (index) => {
    const updatedChecklist = checklist.map((item, i) =>
      i === index ? { ...item, isChecked: !item.isChecked } : item
    );
    setChecklist(updatedChecklist);
  };

  const handleAssigneeChange = (e) => {
    const value = e.target.value;
    setAssine(value);
    setFilteredMembers(
      members.filter((member) => member.email.includes(value))
    );
  };

  const assignMember = (member) => {
    if (selectedMember?.email === member.email) {
      setSelectedMember(null);
      setAssine("");
    } else {
      setSelectedMember(member);
      setAssine(member.email);
    }
    setFilteredMembers([]);
  };

  const formvalue = () => {
    console.log(selectedMember);
    if (!input.trim()) {
      setError("Title is required.");
      return;
    }

    if (!prioritybtn) {
      setError("Priority is required.");
      return;
    }

    if (
      checklist.length === 0 ||
      checklist.some((item) => !item.title.trim())
    ) {
      setError("At least one subtask is required.");
      return;
    }
    setLoading(true);

    if (task) {
      dispatch(
        updateTask({
          ...task,
          title: input,
          priority: prioritybtn,
          assignee: selectedMember?._id,
          dueDate: dueDate ? dueDate.toISOString() : null,
          checklist: checklist,
        })
      )
        .then((res) => {
          if (res.error) {
            toast.error(res.payload.message);
          } else {
            dispatch(fetchTasks());
            dispatch(fetchAnalytics());
            closePopup();
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      dispatch(
        addNewTask({
          title: input,
          priority: prioritybtn,
          assignee: selectedMember?._id,
          dueDate: dueDate ? dueDate.toISOString() : null,
          checklist: checklist,
          status: "todo",
        })
      )
        .then((res) => {
          if (res.error) {
            toast.error(res.payload.message);
          } else {
            dispatch(fetchTasks());
            dispatch(fetchAnalytics());
            closePopup();
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p className="tittle">
          Title <span className="star">*</span>
        </p>
        <div>
          <input
            type="text"
            className="todotaskinput"
            placeholder="Enter Task Title"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="taskbtns">
          <p className="tittle">
            Select Priority <span className="star">*</span>
          </p>
          <div
            className={`taskhighpriority ${
              prioritybtn === "high" ? "selected" : ""
            }`}
            onClick={() => handlebtn("high")}
          >
            <div className="taskcirclehigh"></div>
            <p className="tittle priority-text">HIGH PRIORITY</p>
          </div>
          <div
            className={`taskhighpriority ${
              prioritybtn === "moderate" ? "selected" : ""
            }`}
            onClick={() => handlebtn("moderate")}
          >
            <div className="taskcirclemid"></div>
            <p className="tittle priority-text">MODERATE PRIORITY</p>
          </div>
          <div
            className={`taskhighpriority ${
              prioritybtn === "low" ? "selected" : ""
            }`}
            onClick={() => handlebtn("low")}
          >
            <div className="taskcirclelow"></div>
            <p className="tittle priority-text">LOW PRIORITY</p>
          </div>
        </div>
        {((task && task.isAdmin) || !task) && (
          <div className="assinetask">
            <p className="tittle">Assign to</p>
            <div style={{ width: "100%" }}>
              <input
                type="text"
                className="todotaskinput"
                placeholder="Add an assignee"
                value={assine}
                onChange={handleAssigneeChange}
                onFocus={() => setFilteredMembers(members)}
                style={{ width: "100%" }}
              />
              {filteredMembers.length > 0 && (
                <div className="dropdown">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="dropdown-item">
                      <div className="avatar">{member.name.charAt(0)}</div>
                      <div className="email">{member.email}</div>
                      <button
                        className={`assign-button ${
                          selectedMember?.email === member.email
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => assignMember(member)}
                        style={{
                          backgroundColor:
                            selectedMember?.email === member.email
                              ? "blue"
                              : "#E2E2E2",
                        }}
                      >
                        Assign
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <p className="tittle">
          Checklist <span className="star">*</span>
        </p>
        <div className="mainaddtasktodo">
          {checklist.map((item, index) => (
            <div className="taskItem" key={index}>
              <input
                type="checkbox"
                className="inputcheckboxtodostart"
                checked={item.isChecked}
                onChange={() => handleCheckboxChange(index)}
              />
              <input
                type="text"
                placeholder="Add a task"
                className="ajay"
                value={item.title}
                onChange={(e) => handleTaskChange(index, e.target.value)}
              />
              <img
                src="./Delete.svg"
                alt="Delete"
                className="inputcheckboxtodoend"
                onClick={() => deleteTask(index)}
              />
            </div>
          ))}
        </div>
        <div className="addbtntask">
          <div onClick={addTask} className="addbtntask">
            <img src="./addbtn.svg" alt="" />
            <p className="addnewtask">Add New</p>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="threebtntask">
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            className="datebtntask"
            placeholderText="Select Due Date"
          />
          <div className="savecanclebtn">
            <button
              className="canclebtntask"
              onClick={closePopup}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="savebtntask"
              onClick={formvalue}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;
