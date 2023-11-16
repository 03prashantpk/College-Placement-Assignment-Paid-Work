import React from 'react';

import "./Hero.scss"

const Hero = () => {
    return (
        <div className="Hero">
            <h1>Over 6000+ Colleges & Universities Across India</h1>
            <div className="search">
                <input type="text" placeholder="Search for colleges" />
                <button><i class="fad fa-search"></i></button>
            </div>

            <div className="tags">
                <p>Colleges</p>
                <p>University</p>
                <p>Courses</p>
                <p>Exams</p>
            </div>
        </div>
    )
}

export default Hero;