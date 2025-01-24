import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/TodoSlice';

function Todo() {
  const todos = useSelector((state) => state.todos); 
  const dispatch = useDispatch();

 
  const [editId, setEditId] = useState(null);
  const [newText, setNewText] = useState('');
  
 
  const [todoStatus, setTodoStatus] = useState({});

  const handleEditClick = (todo) => {
    if(todoStatus[todo.id] !== "Completed"){
      setEditId(todo.id); 
      setNewText(todo.text); 
    }
  };

  const handleUpdate = (id) => {
    if (newText.trim() && todoStatus[id] !== 'Completed') {
      dispatch(updateTodo({ id, updates: { text: newText } })); 
      setEditId(null); 
      setNewText(''); 
    }
  };

  const handleProgressToggle = (todo) => {
    setTodoStatus((prevStatus) => {
      const newStatus = prevStatus[todo.id] === 'In Progress' ? 'Completed' : 'In Progress';
  

      if (newStatus === 'Completed') {
        console.log(`Todo ${todo.id} marked as completed!`);
      
      } else {
       
        console.log(`Todo ${todo.id} is now in progress.`);
        
      }
  
      return {
        ...prevStatus,
        [todo.id]: newStatus,
      };
    });
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Todos</h1>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`mt-4 flex justify-between items-center px-4 py-2 rounded ${todoStatus[todo.id] === 'Completed' ? 'bg-green-500' : 'bg-zinc-800'}`}
          >
            {editId === todo.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="text-black border border-gray-300 px-2 py-1 rounded"
                placeholder="Edit todo"
              />
            ) : (
              <div className={`text-white ${todoStatus[todo.id] === 'Completed' ? 'line-through' : ''}`}>
                {todo.text}
              </div>
            )}

            {editId === todo.id ? (
              <button
                onClick={() => handleUpdate(todo.id)}
                className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md ml-auto mr-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(todo)}
                className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md ml-auto mr-2"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              Delete
            </button>

            {/* Progress Button */}
            <button
              onClick={() => handleProgressToggle(todo)}
              className="text-white bg-yellow-500 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded text-md ml-2"
            >
              {todoStatus[todo.id] || 'In Progress'} {/* Default to 'In Progress' */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;