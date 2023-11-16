import React from 'react';
import '../assets/SCSS/Navbar.css';

const Navbar = () => {
    return (
        <nav className="Navbar">
            <div className="left">
                <input type="date"  min="2000-01-01" max="2023-07-04" required placeholder="Select a date" />  
            </div>
            <div className="center">
                <div className="Search">
                    <input type="text" required placeholder="Where to?" />  
                </div>
            </div>
            <div className="right">
                <select>
                    <option value="">Filter</option>
                    <option value="#">Option 1</option>
                    <option value="#">Option 2</option>
                    <option value="#">Option 3</option>
                </select>   
                <select>
                    <option value="#">Select One</option>
                    <option value="#">Option 1</option>
                    <option value="#">Option 2</option>
                    <option value="#">Option 3</option>
                </select> 
            </div>
        </nav>
    );
}

export default Navbar;