import React, { useState } from 'react';
import './signIn.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../utils/authSlice';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(loginSuccess(user));
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log('Error code:', error.code);
        console.log('Error message:', error.message);
        alert("Invalid Login details")
        dispatch(loginFailure());
      });
  };
  return (
    <div className="Sign">
      <h2>LogIn</h2>
      <div className='signIn'>
    <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>{' '}
      </form>
  

      </div>

    </div>
  );
};

export default SignIn;
