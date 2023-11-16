import React from "react";

const Alert = ({ correctCount, wrongCount, timer, totalWords, lastTime }) => {
  return (
    <>
      <div className="alert">
        <div className="correct">Correct: <span>{correctCount}</span> </div>
        <div className="wrong">Incorrect: <span>{wrongCount}</span> </div>
      </div>
      <div className="timer">
        {timer ? (
          `Timer: ${timer} seconds`
        ) : (
          `Last Record: ${totalWords} Words, ${lastTime} seconds`
        )}
      </div>
    </>
  );
};

export default Alert;
