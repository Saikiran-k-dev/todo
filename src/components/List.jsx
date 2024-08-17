import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { todoSelector } from '../redux/todoReducer';
import { useState } from 'react';
import { addTodo,editTodo,deleteTodo } from '../redux/todoReducer';
import styles from "./list.module.css";

const List = () => {
  const dispatch = useDispatch()
  const [newTodo,setNewTodo] = useState("")
  const { isLoading, error, todos } = useSelector(todoSelector);
  console.log(todos);

  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.userId]) {
      acc[todo.userId] = [];
    }
    acc[todo.userId].push(todo);
    return acc;
  }, {});

  if (isLoading) {
    return <div className="message">Loading...</div>;
  }

  if (error) {
    return <div className="message">{error}</div>;
  }
  const addNewTodo = (userId) => {
    if (newTodo.trim()) {
      dispatch(addTodo({
        userId,
        newTodo
      }));
      setNewTodo('');
    }
  };
  const toggleTodo = (userId, id) => {
    dispatch(editTodo({
      userId,
      id
    }));
  };

  const deleteT = (userId,id)=>{
    dispatch(deleteTodo({
      userId,
      id
    }))
  }

  // const addNewTodo = (userId,title)=>{
  //   dispatch(addTodo(userId,title))
  // }

  return (
    <div className={styles.main}>
      {Object.keys(groupedTodos).map(userId => (
        <div key={userId} className={styles.card}>
          <h2 className={styles.todoTitle}>User {userId}</h2>
          <ul className={styles.todoList}>
            {groupedTodos[userId].map((todo, index) => (
              <li key={todo.id} className={todo.completed ? styles.todoItem : styles.todoItemn}>
                <input type='hidden' value={todo.id}/>
                <span>{index + 1}. {todo.title}</span>
                <div className={styles.buttons}>
                  <button className={`${styles.button} ${styles.editButton}`} onClick={() => toggleTodo(userId, todo.id)}>
                    {todo.completed ? "Not done" : "Mark as complete"}
                  </button>
                  <button className={`${styles.button} ${styles.deleteButton}`} onClick={()=> deleteT(userId,todo.id)}>Delete</button>
                </div>
              
              </li>
              
            ))}
          </ul>
          <div>
          <form onSubmit={(e) => e.preventDefault() /* Prevent form submission */}>
              <input type='hidden' value={userId} />
              <input
                type='text'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button
                type='button'
                className={styles.addButton}
                onClick={() => addNewTodo(userId)} // Handle the click event
              >
                Add Todo
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
