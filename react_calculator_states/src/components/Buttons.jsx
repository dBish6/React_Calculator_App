import React, { useState, useEffect, useRef } from "react";

const Buttons = () => {
  // state have two numbers, current, store, display.
  const [fullCalculation, setFullCalculation] = useState("");
  const [result, setResult] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  const btnMap = [
    ["C", "%", "÷", "DEL"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    ["+/-", 0, ".", "="],
  ];

  const operators = ["÷", "X", "-", "+", "."];

  // Del Button Function
  const deleteLast = () => {
    if (fullCalculation === "") {
      return;
    }

    const newString = currentValue.slice(0, -1);

    setFullCalculation(newString);
  };

  // Updates chosen values to the screen.
  const updateScreen = (btnValue) => {
    /* If the first value is a operator and currentValue equals nothing OR 
    if theres a operator and the last value is a operator; stops from adding multiple operators. */
    if (
      (operators.includes(btnValue) && fullCalculation === "") ||
      (operators.includes(btnValue) &&
        operators.includes(fullCalculation.slice(-1)))
    ) {
      return;
    }

    // Initial to display...
    setFullCalculation(fullCalculation + btnValue);

    // Set Result
    if (!operators.includes(btnValue)) {
      console.log(fullCalculation + btnValue);
      if (fullCalculation.includes("X")) {
        setResult(
          eval(fullCalculation.replace("X", "*") + btnValue).toString()
        );
      } else if (fullCalculation.includes("÷")) {
        setResult(
          eval(fullCalculation.replace("÷", "/") + btnValue).toString()
        );
      } else {
        setResult(eval(fullCalculation).toString() + btnValue);
      }
    } else if (operators.includes(btnValue)) {
      console.log("YIP FESDKJ AOEPTERSTER");
      // Adds the values by evaluating.
      if (fullCalculation.includes("X")) {
        console.log("EQUALS412312");
        // Replaces X to * because it needs to be valid javaScript code.
        console.log(fullCalculation.replace("X", "*"));
        setFullCalculation(
          eval(fullCalculation.replace("X", "*") + btnValue).toString()
        );
      } else if (fullCalculation.includes("÷")) {
        console.log("EQUALS432");
        setFullCalculation(
          eval(fullCalculation.replace("÷", "/") + btnValue).toString()
        );
      } else {
        console.log("EQUALS532");
        setFullCalculation(eval(fullCalculation).toString() + btnValue);
      }
    }
  };

  // Equals Button Function
  const calculate = () => {
    if (fullCalculation.includes("X")) {
      console.log("EQUALS2");
      // Replaces X to * because it needs to be valid javaScript code.
      setFullCalculation(eval(fullCalculation.replace("X", "*")).toString());
    } else if (fullCalculation.includes("÷")) {
      console.log("EQUALS3");
      setFullCalculation(eval(fullCalculation.replace("÷", "/")).toString());
    } else {
      console.log("EQUALS4");
      setFullCalculation(eval(fullCalculation).toString());
    }
  };

  return (
    <>
      <div className="calScreen">
        <div className="calScreenInsideBoarder">
          {/* {fullCalculation && <p>{fullCalculation}</p>} */}
          {result ? <span>({result})</span> : ""}
          {result ? (
            <p>
              <span>({result})</span>&nbsp;
              {fullCalculation}
            </p>
          ) : (
            (fullCalculation && <p>{fullCalculation}</p>) || <p>0</p>
          )}
          {/* {<p>{fullCalculation}</p> || <p>0</p>} */}
        </div>
      </div>
      <div className="buttonsContainer">
        {btnMap.flat().map((btn) => {
          return (
            <button
              key={btn}
              className={btn === "=" ? "equals" : ""}
              onClick={() => {
                console.log(`${btn} clicked!`);
                {
                  //   !btn === "=" ? "" : updateScreen(btn.toString());
                }
                {
                  if (btn === "=") {
                    calculate();
                  } else if (btn === "DEL") {
                    deleteLast();
                  } else {
                    updateScreen(btn.toString());
                  }
                  //   (btn === "=" && calculate()) ||
                  //     (btn === "DEL" && deleteLast());
                }
              }}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Buttons;
