
import React from 'react';
import '../Register/Register.scss';

const Login = () => {
    return (
        <div className="Register">
             <div className="register-form">
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Register</button>
            </div>
        </div>
    );
}

export default Login;