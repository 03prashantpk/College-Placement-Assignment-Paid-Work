import React, { useState, useEffect } from "react";

const KeyboardLayout = ({ word, onWordTyped }) => {
  const [activeKeyIndex, setActiveKeyIndex] = useState(0);

  const handleKeyPress = (event) => {
    const { key } = event;
    const currentCharacter = word[activeKeyIndex];

    if (key.toUpperCase() === currentCharacter?.toUpperCase()) {
      setActiveKeyIndex((prevIndex) => prevIndex + 1);
    } else if (key === "Enter") {
      onWordTyped(activeKeyIndex === word.length);
      setActiveKeyIndex(0);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeKeyIndex, word, onWordTyped]);

  const keyboardRows = [
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","{[","}]", "|\\"],
    ["CAPS","A", "S", "D", "F", "G", "H", "J", "K", "L",":;","\"'","Enter"],
    ["Shift","Z", "X", "C", "V", "B", "N", "M", "<,", ">.", "?/","Shift"],
  ];

  return (
    <div className="keyboard">
      <div className="keyboard-layout">
        {keyboardRows.map((row, rowIndex) => (
          <div className="keyboard-row" key={rowIndex}>
            {row.map((char, charIndex) => {
              const isActive = char.toUpperCase() === word[activeKeyIndex]?.toUpperCase();
              const keyStyle = {
                backgroundColor: isActive ? "green" : "black"
              };

              return (
                <div
                  className="key"
                  id={char}
                  key={charIndex}
                  style={keyStyle}
                >
                  {char}
                </div>
              );
            })}
          </div>
        ))}
        <div className="keyboard-row Fn">
            <div className="key ctrl">CTRL</div>
            <div className="key FN profile" onClick={()=>{window.open('https://github.com/03prashantpk','_blank');
           window.open('https://www.linkedin.com/in/03prashantpk/','_blank')}}><i class="fas fa-id-badge"></i></div>
            <div className="key FN"><i class="fab fa-windows"></i></div>
            <div className="key alt">ALT</div>
          
          
          <div className="key space">_______</div>

            <div className="key alt">ALT</div>
            <div className="key FN">FN</div>
            <div className="key ctrl">CTRL</div>
  
        </div>
      </div>
    </div>
  );
};

export default KeyboardLayout;
