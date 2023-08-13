import React, { useState, useEffect } from 'react';

import UserEnrollmentGraph from './Graph/UserEnrollmentGraph';
import TodoSegregationGraph from './Graph/TodoSegregationGraph';
import { db } from '../firebase';

const Chart = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoRef = db.collection('todos');
        const querySnapshot = await todoRef.get();

        const data = querySnapshot.docs.map((doc) => {
          const todo = doc.data();
          return { ...todo, id: doc.id };
        });

        setTodos(data);
      } catch (error) {
        console.error('Error fetching todo data:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="graphs-container">
      <UserEnrollmentGraph />
      <div className="todo-segregation-graph">
        <TodoSegregationGraph todos={todos} />
      </div>
    </div>
  );
};

export default Chart;
