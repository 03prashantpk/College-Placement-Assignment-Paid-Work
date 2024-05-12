import React, { useState } from 'react';
import './Register.scss';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setResponseMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:7000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.error);
            }
        } catch (error) {
            console.error('Error registering:', error);
            setResponseMessage('Error registering');
        }
    };

    return (
        <div className="Register">
            <div className="register-form">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <button type="submit">Register</button>
                    <p id="response">{responseMessage}</p>
                </form>
            </div>
        </div>
    );
};

export default Register;
