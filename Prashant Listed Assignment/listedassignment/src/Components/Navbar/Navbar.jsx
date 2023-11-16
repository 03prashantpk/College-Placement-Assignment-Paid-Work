import React, { useState } from "react";

const Navbar = ({ userEmail, userName, userImage, logout, maxPopulation , saveUser, savedUsers }) => {
  const [isUserDetailsVisible, setUserDetailsVisible] = useState(false);

  const toggleUserDetails = () => {
    setUserDetailsVisible(!isUserDetailsVisible);
  };

  return (
    <div className="navbar">
      <div className="left">
        <h2>Dashboard</h2>
      </div>

      <div className="right">
        <div className="search">
          <input type="text" placeholder="Search..." />{" "}
          <i className="fas fa-search"></i>
        </div>

        <div className="notification">
          <i className="far fa-bell"></i>
        </div>

        <div className="user" onClick={toggleUserDetails}>
          <img src={userImage} alt={userName} />
        </div>
      </div>

      {isUserDetailsVisible && (
        <div className="user-details" onClick={toggleUserDetails}>
          <img src={userImage} alt={userName} />
          <p className="name">{userName}</p>
          <p className="email">{userEmail}</p>
          <button onClick={logout}>Logout <i class="fas fa-sign-out"></i></button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
