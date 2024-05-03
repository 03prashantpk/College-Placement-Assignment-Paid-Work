import React from 'react';
import './Navbar.scss';
import LoginWithFB from '../Login/Login';

const Navbar = () => {

    const openWebpage = () => {
        window.open('https://enally.in', '_blank');
    }

    const TogglePopUp = () => {
        document.querySelector('#notify').style.display = 'flex';
    }

    return (
        <nav>
            <h1>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/2048px-Facebook_icon.svg.png" width="25px" alt="" />
                facebook
            </h1>

            <div className="menu">
                <ul>
                    <li>
                        <a href="https://github.com/03prashantk/MoboWebTechnologyAssignment">
                            <i className="fab fa-github"></i> Github
                        </a>

                    </li>

                    <li>
                        <a href="https://www.linkedin.com/in/03prashantpk">
                            <i className="fab fa-linkedin"></i> Linkedin
                        </a>
                    </li>

                    <li>
                        <LoginWithFB/>
                    </li>
                </ul>

                <div className="buttons">
                    <button type="button" onClick={TogglePopUp}>Read Me</button>
                    <button className="btn" onClick={openWebpage}>Website</button>
                </div>

            </div>

        </nav>
    );
}

export default Navbar;