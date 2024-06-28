import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetData } from "../api";

// Fetch tasks thunk
export const fetchTasks = createAsyncThunk("fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const tasks = await fetchGetData("task/fetchTasks", {}, token);
    console.log(tasks)
    return tasks;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
