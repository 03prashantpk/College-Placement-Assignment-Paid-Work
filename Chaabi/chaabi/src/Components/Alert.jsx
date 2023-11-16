import React from "react";

const Alert = ({ correctCount, wrongCount, timer, totalWords, lastTime }) => {
  return (

    <>
      <div className="alert">
        <div className="correct">Accuracy: <span>{correctCount} <i class="far fa-check"></i></span> <span>{wrongCount} <i class="fas fa-times"></i></span>   </div>
        
        
      </div>
      <div className="stats">
        <div className="timer">
          {timer ? (
            `Timer: ${timer} seconds`
          ) : (
            <>
              Last Record <br />
              {totalWords} Words, {lastTime} seconds
            </>
          )}
        </div>
      </div>
    </>

  );
};

export default Alert;
