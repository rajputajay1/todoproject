


import { createSlice, nanoid } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        tasks: [
            {
                id: nanoid(),
                title: "ajay",
                priority: 'HIGH',
                status: 'to-do',
                assineto: [],
                checklist: [
                    { text: 'rahul', checked: true },
                    { text: 'ajauy', checked: false },
                    { text: 'sahil', checked: false },
                    { text: 'fghf', checked: false },
                ],
                date: 'Jun 17',
            },
        ],
    },
    reducers: {
        addTasks: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...action.payload };
            }
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        updateTaskStatus: (state, action) => {
            const { id, newStatus } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.status = newStatus;
            }
        },
        updateChecklistChecked: (state, action) => {
            const { id, text, checked } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                const checklistItem = task.checklist.find(item => item.text === text);
                if (checklistItem) {
                    checklistItem.checked = checked;
                }
            }
        },
    },
});

export const { addTasks, updateTask, removeTask, updateTaskStatus, updateChecklistChecked } = todoSlice.actions;

export default todoSlice.reducer;
