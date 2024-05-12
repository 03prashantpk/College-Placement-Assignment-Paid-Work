import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    const user_data = localStorage.getItem('token');

    return (
        <nav className='Main-Navbar'>
            <h2>Navbar</h2>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {
                    !user_data ? (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                            <li>
                                <Link to="/chat">Chat</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    );
};

export default Navbar;
