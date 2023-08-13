import React, { useState } from 'react';
import { FaRegTrashAlt, FaCheck, FaEdit } from 'react-icons/fa';
import './TodoTable.css';

const Todo = ({ todo, toggleComplete, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleUpdate = () => {
    if (editedText.trim()) {
      updateTodo({
        ...todo,
        text: editedText,
      });
      setIsEditing(false);
    }
  };
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-row">
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? 'checked' : ''}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="edit-input"
          />
        ) : (
          <p
            onClick={() => toggleComplete(todo)}
            className={`todo-text ${todo.completed ? 'completed' : ''}`}
          >
            {todo.text}
          </p>
        )}
        <div className="end-button">
          {isEditing ? (
            <button className="update-button" onClick={handleUpdate}>
              <FaCheck />
            </button>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <FaEdit />
            </button>
          )}

          <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Todo;
