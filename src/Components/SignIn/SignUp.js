import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../utils/authSlice';
import './signIn.css';
const SignUp = () => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(loginSuccess(user));
        navigate('/');
      })
      .catch(() => {
        dispatch(loginFailure());
      });
  };

  return (
    <div className="Sign">
      <h3 style={{ display: 'flex', justifyContent: 'center' }}>Sign Up</h3>
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
        <p>
          Have an account already? <Link to="/">LogIn</Link>
        </p>
        {error && (
          <span>
            Already Registered User!!
            <br /> Please try again.
          </span>
        )}
      </form>
    </div>
  );
};

export default SignUp;
