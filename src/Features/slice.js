import { createSlice, nanoid } from "@reduxjs/toolkit";
import { addTask, fetchAnalytics, fetchTasks, updateTask } from "./thunk";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    tasks: [],
    analytics:{},
    loading: false,
    error: null,
    filter:"week"
    // newDataLoading: true,
  },
  reducers: {
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateFilter: (state, action) => {
      state.filter = action.payload
    },
    updateTaskStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = newStatus;
      }
    },
    updateChecklistChecked: (state, action) => {
      const { id, text, checked } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        const checklistItem = task.checklist.find((item) => item.text === text);
        if (checklistItem) {
          checklistItem.checked = checked;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload)
        state.analytics = action.payload.data
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeTask, updateTaskStatus, updateChecklistChecked, updateFilter } =
  todoSlice.actions;

export default todoSlice.reducer;
