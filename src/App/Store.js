import { configureStore } from "@reduxjs/toolkit";   //core Redux
import todoReducer from "../features/todo/TodoSlice"

export const store = configureStore({
    reducer:todoReducer
}) 

//Made a store
//Now we will make reducers (also called slices)