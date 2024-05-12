import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className='Main-Navbar'>
            <h2>Navbar</h2>
            
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar;