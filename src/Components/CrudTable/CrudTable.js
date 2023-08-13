import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import TodoTable from './TodoTable';
import { db } from '../../firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

import './CrudTable.css';
import Navbar from '../Navbar/Navbar';

function CrudTable() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [userProfileImage, setUserProfileImage] = useState(null);

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const handleUpdate = async (updatedTodo) => {
    if (updatedTodo.text.trim()) {
      await updateDoc(doc(db, 'todos', updatedTodo.id), {
        text: updatedTodo.text,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, text: updatedTodo.text }
            : todo
        )
      );
    }
  };

  return (
    <div className="bg">
      <Navbar currentUser={currentUser} userProfileImage={userProfileImage} />
      <div className="container">
        <h3 className="heading">Todo App</h3>
        <form onSubmit={createTodo} className="form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input"
            type="text"
            placeholder="Add Todo"
          />
          <button className="add-button">Add</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <TodoTable
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              updateTodo={handleUpdate}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CrudTable;
