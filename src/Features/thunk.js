import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfileApi,fetchGetData, postData, updateData,updateUserProfileApi } from "../api";

// Fetch tasks thunk
export const fetchTasks = createAsyncThunk(
  "fetchTasks",
  async (filter="week", { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const tasks = await fetchGetData(`task/fetchTasks?filter=${filter}`, {}, token);
      console.log(tasks);
      return tasks;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const transformData = (initialData) => {
  console.log(initialData.dueDate);
  return {
    // ...initialData,
    title: initialData.title || "",
    priority: initialData.priority || "high",
    checklist: JSON.stringify(
      initialData.checklist
        ? initialData.checklist.map((item) => ({
            title: item.task || item.title || "",
            isChecked: item.completed || item.isChecked || false,
          }))
        : []
    ),
    ...(initialData.dueDate !== undefined &&
      initialData.dueDate != null && { dueDate: initialData.dueDate }),
    status: initialData.status || "todo",
    _id: initialData._id,
    assignedTo: initialData.assignee
  };
};

// Thunk to add a new task
export const addTask = createAsyncThunk(
  "addTask",
  async (taskData, { rejectWithValue }) => {
    const trannsFormNewData = transformData(taskData);
    console.log(trannsFormNewData);
    try {
      const token = localStorage.getItem("token");
      // Assuming taskData contains the necessary data for creating a task
      const newTask = await postData("task/create", trannsFormNewData, token);
      console.log("New task added:", newTask);
      return newTask;
    } catch (error) {
      console.error("Error adding task:", error);
      return rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "updateTask",
  async (taskData, { rejectWithValue }) => {
    console.log("fjrn", taskData);
    const trannsFormNewData = transformData(taskData);
    console.log(trannsFormNewData);
    if (!taskData.isAdmin) {
      delete trannsFormNewData.assignedTo;
    }
    try {
      const token = localStorage.getItem("token");
      // Assuming taskData contains the necessary data for creating a task
      const newTask = await updateData(
        `task/update/${trannsFormNewData._id}`,
        trannsFormNewData,
        token
      );
      console.log("task updated:", newTask);
      return newTask;
    } catch (error) {
      console.error("Error upadted task:", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  "fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      // Assuming taskData contains the necessary data for creating a task
      const analytics = await fetchGetData(`task/analytics`, {}, token);
      console.log("Analytics", analytics);
      return analytics;
    } catch (error) {
      console.error("Error fetch analytics:", error);
      return rejectWithValue(error);
    }
  }
);


export const updateUserProfile = createAsyncThunk("updateUserProfile", async (userData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await updateUserProfileApi(userData, token);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUserProfile = createAsyncThunk("fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const userProfile = await fetchUserProfileApi(token);
    console.log(userProfile);
    return userProfile;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});