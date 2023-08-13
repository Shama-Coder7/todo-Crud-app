import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { auth, db } from '../../firebase';

const UserEnrollmentGraph = () => {
  const [userEnrollmentData, setUserEnrollmentData] = useState([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const currentTime = new Date();
        const formattedDate = currentTime.toISOString().split('T')[0];
        setUserEnrollmentData((prevData) => [
          ...prevData,
          { date: formattedDate, users: prevData.length + 1 },
        ]);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="user-enrollment-graph">
      <h2>User Enrollment Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={userEnrollmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEnrollmentGraph;
