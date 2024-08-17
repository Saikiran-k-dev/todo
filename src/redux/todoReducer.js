import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const INITIAL_STATE = {todos:[],isLoading:false,error:null}

export const getTodos = createAsyncThunk("todos/fetch",
    async(_,thunkAPI)=>{
        try {
            const respose = await fetch("https://jsonplaceholder.typicode.com/todos")
            const data = await respose.json()
            thunkAPI.dispatch(fetchSuccess(data))

        } catch (e) {
            thunkAPI.dispatch(fetchError());
        }
    }
)

export const addTodod = createAsyncThunk(
    "todos/add",
    async ({ userId, newTodo }, thunkAPI) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            title: newTodo,
            completed: false,
          }),
        });
  
        if (response.ok) {
          const addedTodo = await response.json();
          return { userId, addedTodo };
        }
      } catch (e) {
        console.error("Failed to add todo", e);
      }
    }
  )


  export const editTodod = createAsyncThunk(
    "todos/edit",
    async ({ userId, id, completed }, thunkAPI) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            id,
            completed,
          }),
        });
  
        if (response.ok) {
          const updatedTodo = await response.json();
          return { userId, id, updatedTodo };
        }
      } catch (e) {
        console.error("Failed to update todo", e);
      }
    }
  );

  export const deleteTodod = createAsyncThunk(
    "todos/delete",
    async ({ userId, id }, thunkAPI) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          return { userId, id };
        }
      } catch (e) {
        console.error("Failed to delete todo", e);
      }
    }
  );

const todoSlice = createSlice({
    name:"todos",
    initialState:INITIAL_STATE,
    reducers:{
        fetchStart:(state,action)=>{
            state.isLoading = true;
        },

        fetchSuccess:(state,action)=>{
            state.todos = action.payload;
            state.isLoading = false
        },
        fetchError:(state,action)=>{
            state.error = "failed to fetch todos";
            state.isLoading = false
        },
        addTodo:(state,action)=>{
            state.todos.push({userId:parseInt(action.payload.userId),id:state.todos.length+1,title:action.payload.newTodo,completed:false},
            )//ADDIND STATICALLY
        },
        editTodo: (state, action) => {
            const { userId, id } = action.payload;
            
            const todoIndex = state.todos.findIndex(todo => todo.userId === parseInt(userId) && todo.id === id);
     
            if (todoIndex !== -1) {
              // Toggle the completed status
              state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
            }
          },//SAME GOES HERE
          deleteTodo: (state, action) => {
            const { userId, id } = action.payload;
            const todoIndex = state.todos.findIndex(todo => todo.userId === parseInt(userId) && todo.id === id);
          
            if (todoIndex !== -1) {
              // Remove the todo item from the array
              state.todos.splice(todoIndex, 1);
            }
          }
          
    },
    
})


export const todoReducer = todoSlice.reducer
export const {fetchStart,fetchSuccess,fetchError,addTodo,editTodo,deleteTodo} = todoSlice.actions
export const todoSelector = (state) => state.todoReducer