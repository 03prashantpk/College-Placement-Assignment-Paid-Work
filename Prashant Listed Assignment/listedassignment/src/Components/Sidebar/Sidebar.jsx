import React from "react";
import './SCSS/Sidebar.css';

const Sidebar = () =>{
    return(
        <>
        <div className="sidebar">
          <div className="sidebar-inner">
            <h1>Board<span>.</span></h1>

            <ul className="top-nav">
                <p><i class="material-icons">dashboard</i> Dashboard</p>
                <p><i class="far fa-tags"></i> Transactions</p>
                <p><i class="fas fa-calendar-check"></i> Schedules</p>
                <p><i class="fas fa-user-circle"></i> Users</p>
                <p><i class="fas fa-cog"></i> Settings</p>
            </ul>

            <ul className="footer">
                <p>Help</p>
                <p>Contact Us</p>
            </ul>
          </div>
      </div>
        </>
    )
}

export default Sidebar;