import React from 'react';

const CardComponent = ({ children }) => {
  return (
    <div className="course-card">
      {children}
    </div>
  );
}

export default CardComponent;
