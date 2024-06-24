import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "../Features/TodoSlice";

const Store = configureStore({
    reducer: {
        todo:TodoSlice
    }


})

export default Store;