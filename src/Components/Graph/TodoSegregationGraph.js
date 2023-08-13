import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { db } from '../../firebase'; 
const TodoSegregationGraph = () => {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    const fetchTodoData = async () => {
      try {
        const todoRef = db.collection('todos'); 
        const querySnapshot = await todoRef.get();

        const data = querySnapshot.docs.map((doc) => {
          const todo = doc.data();
          return { ...todo, timestamp: todo.timestamp.toDate() };
        });

        setTodoData(data);
      } catch (error) {
        console.error('Error fetching todo data:', error);
      }
    };

    fetchTodoData();
  }, []);

  const currentDate = new Date();
  const processedData = {
    open: todoData.filter((todo) => !todo.completed && todo.timestamp <= currentDate),
    closed: todoData.filter((todo) => todo.completed === true && todo.timestamp <= currentDate),
    ongoing: todoData.filter((todo) => todo.status === 'ongoing' && todo.timestamp <= currentDate),
  };

  const dataForGraph = [
    { category: 'Open', count: processedData.open.length },
    { category: 'Closed', count: processedData.closed.length },
    { category: 'Ongoing', count: processedData.ongoing.length },
  ];
  return (
    <div className="todo-segregation-graph">
      <h2>Todo Segregation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataForGraph}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TodoSegregationGraph;
