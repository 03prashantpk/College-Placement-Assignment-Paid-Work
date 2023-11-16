import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import "./Navbar.scss"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const navbar = document.querySelector(".Navbar");
    function handleScroll() {
      if (window.scrollY > navbar.offsetTop) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`Navbar ${menuOpen ? "open" : ""}`}>
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="menu" style={{ display: menuOpen ? "flex" : "" }}>
        <ul>
          <li><i className="fas fa-university"></i> University</li>
          <li><i className="fas fa-graduation-cap"></i> Colleges</li>
          <li><i className="fal fa-books"></i> Courses</li>
          <li><i className="fab fa-accusoft"></i> About</li>
          <li><i className="fal fa-envelope"></i> Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
