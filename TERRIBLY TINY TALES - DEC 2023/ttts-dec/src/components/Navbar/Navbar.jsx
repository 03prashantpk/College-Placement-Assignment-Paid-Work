import "./Navbar.scss";
const Navbar = () => {
    return (
        <nav className="Navbar">
            <div className="name-logo">
                <img src="https://www.terriblytinytales.com/img/home/ttt.svg" alt="logo" />
                <h2>Stories</h2>
            </div>
            <div className="menu">
                <a href="#">Courses</a>
            </div>
        </nav>
    )
}

export default Navbar;