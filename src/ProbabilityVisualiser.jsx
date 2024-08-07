import React, { useState, useRef, useEffect } from "react";

function ProbabilityVisualiser() {
  const [percentage, setPercentage] = useState(50);
  const [probability, setProbability] = useState("128");
  const [attempts, setAttempts] = useState(0);
  const probabilityInputRef = useRef(null);

  useEffect(() => {
    probabilityInputRef.current.style.width =
      probabilityInputRef.current.value.length + "ch";

    setPercentage(calcPercentage());
  }, [probability]);

  // useEffect(() => {
  //   setPercentage(calcPercentage());
  // }, [attempts]);

  useEffect(() => {
    setAttempts(calcAttempts());
  }, [percentage]);

  function handleSliderChange(event) {
    setPercentage(event.target.value);
  }

  function handleProbabilityChange(event) {
    setProbability(event.target.value);
    probabilityInputRef.current.style.width = "4px;";
  }

  function handleAttemptsChange(event) {
    setAttempts(event.target.value);
  }

  function calcPercentage() {
    const newPercentage =
      (1 - Math.pow((probability - 1) / probability, attempts)) * 100;
    return newPercentage.toFixed(2);
  }

  function calcAttempts() {
    const percentageDecimal = percentage / 100;
    const newAttempts =
      Math.log(1 - percentageDecimal) /
      Math.log((probability - 1) / probability);
    return newAttempts.toFixed(0);
  }

  return (
    <>
      <div className="app-container">
        <h1>How unlucky am I really?</h1>
        <div className="explanation-text">
          <span>
            If you attempt to recieve a prize with a 1/100 chance, you might
            think that attempting 100 times would give you a close to 100%
            chance of recieving the prize. However the actual percentage chance
            of recieving a prize in that scenario would be ~63%. Use the
            calculator below to visual how attempts effect your chance of
            winning
          </span>
        </div>
        <div>
          <span className="probability-display">
            If an event has a 1/
            <input
              className="probability-input"
              type="number"
              value={probability}
              placeholder="100"
              onChange={handleProbabilityChange}
              ref={probabilityInputRef}
            />{" "}
            of occurring
          </span>
        </div>
        <div className="visualiser-container">
          <div className="display-container">
            <div className="percentage-container">
              <span className="percentage-display">{percentage}%</span>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={percentage}
                className="slider"
                id="myRange"
                onChange={handleSliderChange}
              />
            </div>
          </div>
          <div className="display-attempts-container">
            <div>
              <span className="attempts-display">{attempts}</span>
            </div>
            <input
              type="number"
              value={attempts}
              onChange={handleAttemptsChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProbabilityVisualiser;
