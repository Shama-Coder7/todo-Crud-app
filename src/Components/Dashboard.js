import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './utils/authSlice';
import '../App.css';
import Chart from './Chart';
import Navbar from './Navbar/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userProfileImage, setUserProfileImage] = useState(null);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dashboard">
      <Navbar currentUser={currentUser} userProfileImage={userProfileImage} />
      <h1>Welcome to Your Dashboard</h1>
      {currentUser ? (
        <div className="login-user">
          <p>Hello- {currentUser.email}</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>

          <button className="profile-update">
            <Link to="/profile-update" style={{ color: 'white' }}>
              Profile-Update
            </Link>
          </button>
        </div>
      ) : (
        <p>Please log in to view your dashboard.</p>
      )}

      <Chart />
    </div>
  );
};

export default Dashboard;
