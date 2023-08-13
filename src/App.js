import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import appStore from './Components/utils/appStore';

import Dashboard from './Components/Dashboard';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignIn/SignUp';
import CrudTable from './Components/CrudTable/CrudTable';
import Navbar from './Components/Navbar/Navbar';
import ProfileUpdate from './Components/Profile/ProfileUpdate';

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [userProfileImage, setUserProfileImage] = useState(
    localStorage.getItem('userProfileImage') || null
  );

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  const RedirectToDashboard = () => {
    if (currentUser) {
      return <Navigate to="/dashboard" />;
    }
    return null;
  };

  return (
    <Provider store={appStore}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<RequireAuth children={<Navbar />} />} />
            <Route
              path="/dashboard"
              element={<RequireAuth children={<Dashboard />} />}
            />
            <Route
              path="/crud-table"
              element={<RequireAuth children={<CrudTable />} />}
            />
            <Route
              path="/profile-update"
              element={
                <RequireAuth
                  children={
                    <ProfileUpdate
                      title="Update User"
                      updateUserProfileImage={setUserProfileImage}
                    />
                  }
                />
              }
            />
            <Route path="/" element={<RedirectToDashboard />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
