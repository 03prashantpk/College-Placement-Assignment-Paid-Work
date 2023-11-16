import React, { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../Auth';
import { Icon } from '@iconify/react';
import './SCSS/Login.css';

const Login = ({ login }) => {

  useEffect(() => {
    document.title = "Login - Board.";
  }, []);
  
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      console.log('Logged in with Google');
      console.log('User:', user);

      login();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className='container'>
      <div className='card'>
        <h1>
          Board<span>.</span>
        </h1>
      </div>
      <div className='card'>
        <div className='login-container'>
          <h1>Sign In</h1>
          <p>Sign in to your account</p>

          <div className='button-group'>
            <button onClick={loginWithGoogle}>
              <Icon className='icon' icon='logos:google-icon' /> Sign with Google
            </button>
            <button onClick={loginWithGoogle}>
              <Icon className='icon' icon='ic:baseline-apple' /> Sign with Apple
            </button>
          </div>

          <form>
            <div className='input-group'>
              <label htmlFor='email'>Email Address</label>
              <input type='email' name='email' id='email' value='johndeo@gmail.com' />
            </div>

            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' id='password' value='asdfghjkl' />
            </div>
            <p>Forgot Password?</p>
            <button type='button'>Sign In</button>
          </form>

          <p className='register'>
            Don't have an account? <span>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
