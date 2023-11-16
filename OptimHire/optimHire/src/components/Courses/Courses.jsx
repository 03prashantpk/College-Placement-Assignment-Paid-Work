import React from 'react';
import Stats from "./Stats";
import './Courses.scss';
import CardComponent from '../Assets/CardComponents/CardComponents';
import mbaImage from '../../assets/images/mba.jpg';
import cheImage from '../../assets/images/chem.webp';
import engImage from '../../assets/images/eng.jpg';
import reactImage from '../../assets/images/react.webp';
import courseData from '../../data/courses.json'; 
import ViewMore from '../Assets/ViewMore/ViewMore';

const courseImages = [mbaImage, cheImage, engImage, reactImage ,engImage, reactImage];

const Courses = () => {
  return (
    <div className="Courses">
      <Stats />
      <div className="courses-content">
        <h1>Explore Courses</h1>

        <div className="course">
          {courseData.map((course, index) => (
            <CardComponent key={index}>
              <div className="course-card-img">
                <img src={courseImages[index]} alt={course.title} />
              </div>
              <div className="course-card-content">
                <h2>{course.title}</h2>
                <p>{course.instructor}</p>
              </div>
              <div className="course-card-footer">
                <div className="footer-content">
                  <p>{course.courseCount}</p>
                  <button>View Courses</button>
                </div>
              </div>
            </CardComponent>
          ))}
        </div>
      </div>
      <ViewMore />
    </div>
  );
}

export default Courses;
