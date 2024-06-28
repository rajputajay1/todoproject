import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "../Features/slice";
import AuthSlice from "../Features/AuthSlice";

const Store = configureStore({
    reducer: {
        todo: TodoSlice,
       
    }


})

export default Store;