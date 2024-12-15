import { useState } from "react";
import {
  handleAddCircle,
  handleAddRectangle,
  handleChangeColor,
} from "../utils/utils";
import "../styles/style.css";

const DynamicShapesWithAllFunc = ({ shapes, setShapes, selectedId }) => {
  const [backgroundColor, setBackgroundColor] = useState("#ff0000");

  return (
    <div className="dynamicShapesContainer">
      <span
        className="spanStyle fw-medium"
        style={{ backgroundColor: "#f5f3f6" }}
      >
        Objects Color change and resize
      </span>
      <div className="d-flex gap-4 justify-content-between p-3 bg-white">
        <div className="d-flex gap-3 align-items-center">
          <button
            className="addRectangleBtn"
            onClick={() => handleAddRectangle(shapes, setShapes)}
          ></button>
          <button
            className="addRectangleBtn"
            onClick={() => handleAddCircle(shapes, setShapes)}
            style={{
              borderRadius: "50%",
            }}
          ></button>
        </div>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) =>
            handleChangeColor(
              e.target.value,
              setBackgroundColor,
              setShapes,
              selectedId
            )
          }
          disabled={!selectedId}
        />
      </div>
    </div>
  );
};
export default DynamicShapesWithAllFunc;
