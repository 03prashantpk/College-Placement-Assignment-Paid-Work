import React from 'react';

import Courses from '../../assets/images/courses.png';
import College from '../../assets/images/colleges.png';
import Counsellors from '../../assets/images/counsellors.png';
import Exams from '../../assets/images/exam.png';

import './Stats.scss';

const statsData = [
  { image: College, count: '5K+', text: 'Colleges' },
  { image: Courses, count: '8K+', text: 'Courses' },
  { image: Counsellors, count: '2K+', text: 'Counsellors' },
  { image: Exams, count: '3K+', text: 'Exams' },
];

const Stats = () => {
  return (
    <div className="Stats">
      <div className="content">
        {statsData.map((stat, index) => (
          <div className="stat" key={index}>
            <div className="left">
              <img src={stat.image} alt="" />
            </div>
            <div className="right">
              <h1>{stat.count}</h1>
              <p>{stat.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
