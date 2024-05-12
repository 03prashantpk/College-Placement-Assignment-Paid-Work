// Updated React component with barrier token and user mapping
import React, { useState, useEffect } from 'react';
import './Chat.scss';

const Chat = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:7000/allusers', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="Chat">
           
            
            <div className="users">
                <h2>Users</h2>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>{user.email}</li>
                    ))}
                </ul>
            </div>

            <div className="chat-box">
                <div className="chat-messages">
                    {/* Chat messages go here */}
                </div>
                <div className="chat-input">
                    <input type="text" />
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
