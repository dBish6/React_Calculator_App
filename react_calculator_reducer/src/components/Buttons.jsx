import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPERATOR: "choose_operator",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  CALCULATE: "calculate",
};

// Different type of actions and pass along parameters with payload.
// Payload is what they just inputted.
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // Overwrites when a user inputs numbers again after CALCULATE.
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      // Can't add more "0"'s or "."'s.
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATOR:
      // If there is nothing chosen, disables operator buttons.
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      // If the user inputs a operator when it's already chosen; overrides to new payload.
      if (state.currentOperand == null) {
        return {
          ...state,
          operator: payload.operator,
        };
      }
      // Makes currentOperand to previousOperand to display other half of the calculation above on screen.
      if (state.previousOperand == null) {
        return {
          ...state,
          operator: payload.operator,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      // Adds when there is operator.
      return {
        ...state,
        operator: payload.operator,
        previousOperand: evaluate(state),
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.CALCULATE:
      if (
        state.operator == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        operator: null,
        previousOperand: null,
        currentOperand: evaluate(state),
      };
    default:
      alert("Uh-oh... something when wrong within the reducer!");
      return state;
  }
};

// To calculate...
const evaluate = ({ currentOperand, previousOperand, operator }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let calculation = "";
  switch (operator) {
    case "+":
      calculation = prev + current;
      break;
    case "−":
      calculation = prev - current;
      break;
    case "×":
      calculation = prev * current;
      break;
    case "÷":
      calculation = prev / current;
      break;
  }

  return calculation.toString();
};

// Number formatting...
const NUMBER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
const formatOperand = (operand) => {
  if (operand == null) return;
  const [number, decimal] = operand.split(".");
  // Happens every time because there is no decimal until format.
  if (decimal == null) return NUMBER_FORMATTER.format(number);
  return `${NUMBER_FORMATTER.format(number)}.${decimal}`;
};

const Buttons = () => {
  /* useReducer Initial */
  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <>
      <div className="calScreen">
        <div className="previousOperand">
          <p>
            {formatOperand(previousOperand)} {operator}
          </p>
        </div>
        <div className="currentOperand">
          <p>{formatOperand(currentOperand)}</p>
        </div>
      </div>
      <div className="buttonsContainer">
        <div>
          <button
            className="spanBtn1 clearBtn"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            C
          </button>
          <button
            className="spanBtn1 deleteBtn"
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          >
            DEL
          </button>
          <OperatorButton
            className="operator"
            operator="÷"
            dispatch={dispatch}
          />
        </div>
        <div>
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperatorButton operator="×" dispatch={dispatch} />
        </div>
        <div>
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperatorButton operator="+" dispatch={dispatch} />
        </div>
        <div>
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperatorButton operator="−" dispatch={dispatch} />
        </div>
        <div>
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <button
            className="spanBtn2 operator"
            onClick={() => dispatch({ type: ACTIONS.CALCULATE })}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
};

export default Buttons;
