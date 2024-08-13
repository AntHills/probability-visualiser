import ProbabilityVisualiser from "./ProbabilityVisualiser.jsx";
import ReactGA from "react-ga4";
import React, { useEffect } from "react";

ReactGA.initialize("G-375PSGNH4R");

function App() {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <>
      <ProbabilityVisualiser />
    </>
  );
}

export default App;
