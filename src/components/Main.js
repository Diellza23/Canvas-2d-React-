import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Line,
  Arrow,
  Transformer,
} from "react-konva";
import { ACTIONS } from "../constants";
import { v4 as uuidv4 } from "uuid";
import fields from "./Fields";
import {
  handleDeselect,
  handleDragEnd,
  handleTransformEnd,
  onClick,
  onPointerDown,
  onPointerMove,
  onPointerUp,
} from "../utils/utils";
import ShapeComponent from "./ShapeComponent";
import Actions from "./Actions";
import RenderShapes from "./RenderShapes";
import AllShapeComponents from "./AllShapeComponents";
import "../styles/style.css";

const Main = () => {
  const [objects, setObjects] = useState(() => {
    const saved = localStorage.getItem("canvasObjects");
    return saved ? JSON.parse(saved) : fields;
  });

  const [selectedId, setSelectedId] = useState(null);
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#ff0000");
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [scribbles, setScribbles] = useState([]);
  const [shapes, setShapes] = useState([]);
  const stageRef = useRef();
  const strokeColor = "#000";
  const isPaining = useRef();
  const currentShapeId = useRef();
  const transformerRef = useRef();

  const attachTransformer = (node) => {
    if (node && transformerRef.current) {
      transformerRef.current.nodes([node]);
      transformerRef.current.getLayer().batchDraw();
    }
  };

  const isDraggable = action === ACTIONS.SELECT;

  const shapeTypes = [
    { type: "rect", icon: "" },
    { type: "circle", icon: "" },
    { type: "triangle", icon: "△" },
    { type: "star", icon: "☆" },
    { type: "heart", icon: "♡" },
    { type: "emoji", icon: "😊" },
  ];

  useEffect(() => {
    localStorage.setItem("canvasObjects", JSON.stringify(objects));
  }, [objects]);

  return (
    <div className="p-4">
      <Actions
        selectedId={selectedId}
        setObjects={setObjects}
        setRectangles={setRectangles}
        setCircles={setCircles}
        setArrows={setArrows}
        setScribbles={setScribbles}
        setShapes={setShapes}
        setSelectedId={setSelectedId}
        stageRef={stageRef}
        objects={objects}
      />

      <div className="d-flex gap-5">
        <AllShapeComponents
          shapeTypes={shapeTypes}
          objects={objects}
          setObjects={setObjects}
          setAction={setAction}
          shapes={shapes}
          setShapes={setShapes}
          selectedId={selectedId}
          setFillColor={setFillColor}
          fillColor={fillColor}
        />

        <Stage
          className="stage"
          ref={stageRef}
          // width={window.innerWidth}
          height={500}
          width={1000}
          onPointerDown={() =>
            onPointerDown(
              action,
              stageRef,
              uuidv4,
              currentShapeId,
              isPaining,
              setRectangles,
              setCircles,
              setArrows,
              setScribbles,
              fillColor
            )
          }
          onPointerMove={() =>
            onPointerMove(
              action,
              isPaining,
              stageRef,
              setRectangles,
              currentShapeId,
              setCircles,
              setArrows,
              setScribbles
            )
          }
          onPointerUp={() => onPointerUp(isPaining)}
          onMouseDown={(e) => handleDeselect(e, setSelectedId, transformerRef)}
        >
          <Layer>
            {objects.map((obj, index) => (
              <ShapeComponent
                key={index}
                type={obj.type}
                obj={obj}
                setSelectedId={setSelectedId}
                handleDragEnd={handleDragEnd}
                selectedId={selectedId}
                setObjects={setObjects}
              />
            ))}

            {rectangles.map((rectangle, index) => (
              <Rect
                key={index}
                x={rectangle.x}
                y={rectangle.y}
                stroke={strokeColor}
                strokeWidth={1}
                fill={rectangle.fillColor}
                height={rectangle.height}
                width={rectangle.width}
                draggable={isDraggable}
                onClick={(e) =>
                  onClick(
                    e,
                    rectangle.id,
                    action,
                    setSelectedId,
                    transformerRef
                  )
                }
              />
            ))}

            {circles.map((circle, index) => (
              <Circle
                key={index}
                radius={circle.radius}
                x={circle.x}
                y={circle.y}
                stroke={strokeColor}
                strokeWidth={2}
                fill={circle.fillColor}
                draggable={isDraggable}
                onClick={(e) =>
                  onClick(e, circle.id, action, setSelectedId, transformerRef)
                }
              />
            ))}
            {arrows.map((arrow, index) => (
              <Arrow
                key={index}
                points={arrow.points}
                stroke={strokeColor}
                strokeWidth={2}
                fill={arrow.fillColor}
                draggable={isDraggable}
                onClick={(e) =>
                  onClick(e, arrow.id, action, setSelectedId, transformerRef)
                }
              />
            ))}

            {scribbles.map((scribble, index) => (
              <Line
                key={index}
                lineCap="round"
                lineJoin="round"
                points={scribble.points}
                stroke={strokeColor}
                strokeWidth={2}
                fill={scribble.fillColor}
                draggable={isDraggable}
                onClick={(e) =>
                  onClick(e, scribble.id, action, setSelectedId, transformerRef)
                }
              />
            ))}
            {RenderShapes &&
              RenderShapes({
                shapes,
                setShapes,
                setSelectedId,
                selectedId,
                attachTransformer,
                handleTransformEnd,
              })}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Main;
