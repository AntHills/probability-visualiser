import React, { useState, useRef, useEffect } from "react";

function ProbabilityVisualiser() {
  const [percentage, setPercentage] = useState(50);
  const [probability, setProbability] = useState("128");
  const [attempts, setAttempts] = useState(0);
  const probabilityInputRef = useRef(null);
  const attemptInputRef = useRef(null);

  useEffect(() => {
    probabilityInputRef.current.style.width =
      probabilityInputRef.current.value.length + "ch";

    setPercentage(calcPercentage());
  }, [probability]);

  useEffect(() => {
    if (attempts !== "Infinity") {
      attemptInputRef.current.style.width =
        attemptInputRef.current.value.length + "ch";
    } else {
      attemptInputRef.current.style.width = "50px";
    }
  }, [attempts]);

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
            <span className="probability-display">If an event has a</span>
            1/
            <input
              className="probability-input"
              type="number"
              value={probability}
              placeholder="100"
              onChange={handleProbabilityChange}
              ref={probabilityInputRef}
            />{" "}
            <span className="probability-display">of occurring.</span>
            <span className="probability-display">After</span>
          </span>
          <input
            type="number"
            value={attempts}
            onChange={handleAttemptsChange}
            className="attempts-input"
            ref={attemptInputRef}
          />
          <span className="probability-display">attempts</span>
        </div>
        <div className="visualiser-container">
          <div className="display-container">
            <div className="percentage-container">
              <span className="probability-display">There is a</span>
              <span className="percentage-display">{percentage}%</span>
              <input
                type="range"
                min="0"
                max="99.90"
                step="0.1"
                value={percentage}
                className="slider"
                id="myRange"
                onChange={handleSliderChange}
              />
              <span className="probability-display">of success</span>
            </div>
          </div>
          <div className="display-attempts-container"></div>
        </div>
      </div>
    </>
  );
}

export default ProbabilityVisualiser;
