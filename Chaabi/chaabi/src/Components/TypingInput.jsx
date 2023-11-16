import React, { useState, useEffect, useRef } from "react";

const TypingInput = ({ word, onWordTyped }) => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (event) => {
    const typedValue = event.target.value;
    const isInputCorrect = word.startsWith(typedValue);

    setIsCorrect(isInputCorrect);
    setInputValue(typedValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (isCorrect && word === inputValue) {
        onWordTyped(true);
      }
      setInputValue("");
    }
  };

  return (
    <div className="typing-input">
      <input
        type="text"
        placeholder="Please start typing... Press Enter for next word."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className={isCorrect ? "correct" : "wrong"}
        ref={inputRef}
      />
    </div>
  );
};

export default TypingInput;
