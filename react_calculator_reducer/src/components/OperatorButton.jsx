import { ACTIONS } from "./Buttons";

const OperatorButton = ({ dispatch, operator }) => {
  return (
    <button
      className="operator"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator } })
      }
    >
      {operator}
    </button>
  );
};

export default OperatorButton;
