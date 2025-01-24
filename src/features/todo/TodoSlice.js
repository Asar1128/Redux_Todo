import { createSlice ,nanoid} from "@reduxjs/toolkit";

//nanoid creates unique ids

//create initial state 
const initialState  = {
    todos:[{id:1, text:"Hello world" , CompletedTodo:false}]
}

export const todoSlice = createSlice({
    name:"todos",
    initialState,
    reducers: {
        addTodo: (state , action)=>{
          const todo = {
            id:nanoid(),
            text:action.payload ,
             CompletedTodo:false
          }
          state.todos.push(todo) // We have to push it to the todos defined on line no 07
        },  //jab bhi ham add todo  karenge to hamain 2 cheeze mele gee 1 state and other is action
     //STATE:   //state will give you access of initially store values in initialstate

        removeTodo: (state , action)=>{
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, updates } = action.payload;
            console.log("Updating todo with ID:", id);
            console.log("Updates:", updates);
            state.todos = state.todos.map((todo) =>
              todo.id === id ? { ...todo, ...updates } : todo
            );
          },
    }  //reducers includes properties and functions 
})
//we will update states individually through these functions 
export const {addTodo , removeTodo , updateTodo} = todoSlice.actions
export default todoSlice.reducer
// Now the store should also need awareness about reducers if he hasnt has the inforamtion 
// then he will not update any thing because the store in Redux isrestricted Store it cant update anything with out awarenessor information from 
// reducers 

