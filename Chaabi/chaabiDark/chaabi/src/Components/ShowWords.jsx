import React, { useState, useEffect } from "react";
import TypingInput from "./TypingInput";
import KeyboardLayout from "./KeyboardLayout";
import Alert from "./Alert";

const ShowWords = () => {
  const generateRandomWord = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const wordLength = Math.floor(Math.random() * 5) + 2;
    let word = "";

    for (let i = 0; i < wordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      word += characters[randomIndex];
    }

    return word;
  };

  const clearRecords = () => {
    localStorage.removeItem("totalWords");
    localStorage.removeItem("totalTime");
    localStorage.removeItem("lastSpeed");
    setTotalWords(0);
    setTotalTime(0);
  };

  const [words, setWords] = useState([generateRandomWord()]);
  const [wordIndex, setWordIndex] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const handleWordTyped = (isWordCorrect) => {
    if (isWordCorrect) {
      setCorrectCount(correctCount + 1);
      if (wordIndex === words.length - 1) {
        setWords([generateRandomWord()]);
        setWordIndex(0);
      } else {
        setWordIndex(wordIndex + 1);
      }
    } else {
      setWrongCount(wrongCount + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.key === "Enter") {
        if (wordIndex === 0 && startTime === null) {
          setStartTime(new Date().getTime());
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [wordIndex, startTime]);

  useEffect(() => {
    if (startTime !== null) {
      const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        setTimer(elapsedTime);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [startTime]);

  useEffect(() => {
    const savedTotalWords = parseInt(localStorage.getItem("totalWords")) || 0;
    const savedTotalTime = parseInt(localStorage.getItem("totalTime")) || 0;

    const currentTotalWords = savedTotalWords + correctCount;
    const currentTotalTime = savedTotalTime + timer;

    setTotalWords(currentTotalWords);
    setTotalTime(currentTotalTime);

    localStorage.setItem("totalWords", currentTotalWords);
    localStorage.setItem("totalTime", currentTotalTime);

    let lastSpeed = 0;
    if (currentTotalWords > 0 && currentTotalTime > 0) {
      lastSpeed = (currentTotalWords / currentTotalTime) * 60;
      localStorage.setItem("lastSpeed", lastSpeed.toFixed(2));
    } else {
      localStorage.removeItem("lastSpeed");
    }

    return () => {
      localStorage.removeItem("lastSpeed");
    };
  }, [correctCount, timer]);

  return (
    <>
      <Alert
        correctCount={correctCount}
        wrongCount={wrongCount}
        timer={timer}
        totalWords={totalWords}
        lastTime={totalTime}
      />
      <button onClick={clearRecords} className="clear-record">Clear Records</button>
      <div className="show-words">
        {words.map((word, index) => (
          <div className="word" key={index}>
            {word}
          </div>
        ))}
      </div>
      <TypingInput
        word={words[wordIndex]}
        onWordTyped={handleWordTyped}
        wrongCount={wrongCount}
        startTime={startTime}
        setStartTime={setStartTime}
      />
      <KeyboardLayout word={words[wordIndex]} onWordTyped={handleWordTyped} />
    </>
  );
};

export default ShowWords;
