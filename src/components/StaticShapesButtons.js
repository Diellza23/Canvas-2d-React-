import { addShape } from "../utils/utils";
import "../styles/style.css";
const StaticShapesButtons = ({ type, objects, setObjects }) => {
  return (
    <button
      onClick={() => addShape(type, objects, setObjects)}
      className={`shape-button ${type}`}
    >
      {type === "triangle"
        ? "△"
        : type === "star"
        ? "☆"
        : type === "heart"
        ? "♡"
        : type === "emoji"
        ? "😊"
        : ""}
    </button>
  );
};

export default StaticShapesButtons;
