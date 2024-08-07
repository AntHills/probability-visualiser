import React, { useState, useRef, useEffect } from "react";

function ProbabilityVisualiser() {
  const [percentage, setPercentage] = useState(50);
  const [probability, setProbability] = useState("100");
  const [attempts, setAttempts] = useState(0);
  const probabilityInputRef = useRef(null);

  useEffect(() => {
    probabilityInputRef.current.style.width =
      probabilityInputRef.current.value.length + "ch";
  }, [probability]);

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

  return (
    <>
      <div className="visualiser-container">
        <h1>How unlucky am I really?</h1>
        <p>
          When estimating the probability of an event occurring it is common for
          this to be misinterpreted. For example, if there is an event that is
          1/100 change of occurring, if you make an attempt 100 times the
          probabiliy that it will occur is ~64% chance of having a successful
          attempt (not 100%)
        </p>
        <div className="display-container">
          <span className="percentage-display">{percentage}%</span>
          <span className="probability-display">
            1/
            <input
              className="probability-input"
              type="number"
              value={probability}
              placeholder="100"
              onChange={handleProbabilityChange}
              ref={probabilityInputRef}
            />
          </span>
          <span className="attempts-display">{attempts}</span>
        </div>
        <div className="controls">
          <input
            type="number"
            value={attempts}
            onChange={handleAttemptsChange}
          />
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={percentage}
            class="slider"
            id="myRange"
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </>
  );
}

export default ProbabilityVisualiser;
