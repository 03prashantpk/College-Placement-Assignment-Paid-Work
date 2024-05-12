// Login.js

import React, { useState } from 'react';
import '../Register/Register.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:7000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.user.email + ' logged in')
                localStorage.setItem('token', data.token);

                window.location.href = '/';
            } else {
                const data = await response.json();
                setResponse(data.error);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setResponse('Internal Server Error');
        }
    };

    return (
        <div className="Register">
            <div className="register-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Login</button>
                    <p id="response">{response}</p>
                </form>
            </div>
        </div>
    );
}

export default Login;
