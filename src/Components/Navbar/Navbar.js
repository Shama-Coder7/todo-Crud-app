import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser }) => {
  return (
    <div className="nav-container">
      <div className="nav-left">TODO</div>
      <div className="nav-right">
        <ul className="nav-links">
        
        <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/crud-table">Todo</Link>
          </li>


          {currentUser && (
            <div className="user-profile">
              <img
                src={
                  currentUser.photoURL ||
                  'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                }
                alt="User Profile"
              />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
