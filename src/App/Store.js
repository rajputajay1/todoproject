import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "../Features/TodoSlice";
import AuthSlice from "../Features/AuthSlice";

const Store = configureStore({
    reducer: {
        todo: TodoSlice,
        auth: AuthSlice
    }


})

export default Store;