import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./redux/todoReducer";

export const store = configureStore({
    reducer:{todoReducer}
})