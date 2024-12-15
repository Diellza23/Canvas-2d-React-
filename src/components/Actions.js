import React from "react";
import { exportCanvas, handleDelete, handleUpload } from "../utils/utils";
import "../styles/style.css";
import { DownloadIcon } from "../assets";
const Actions = ({
  selectedId,
  setObjects,
  setRectangles,
  setCircles,
  setArrows,
  setScribbles,
  setShapes,
  setSelectedId,
  stageRef,
  objects,
}) => {
  return (
    <div
      className="d-flex justify-content-end mb-3 gap-4"
      style={{
        width: "100%",
      }}
    >
      <button
        onClick={() =>
          handleDelete(
            selectedId,
            setObjects,
            setRectangles,
            setCircles,
            setArrows,
            setScribbles,
            setShapes,
            setSelectedId
          )
        }
        disabled={!selectedId}
        className="btn btn-danger"
      >
        Delete Selected
      </button>
      <button
        className="btn btn-light  d-flex align-items-center gap-1"
        onClick={() => exportCanvas(stageRef)}
      >
        <img src={DownloadIcon} alt="download" width="20" />
        Export
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleUpload(e, objects, setObjects)}
      />
    </div>
  );
};

export default Actions;
