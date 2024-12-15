import { Arrow, Circle, Line, Rect } from "react-konva";

const ShapeRenderer = ({ shape, isDraggable, strokeColor, onClick }) => {
  const { type, id, ...otherProps } = shape;
  const handleClick = (e) => onClick(e, id);

  switch (type) {
    case "rect":
      return (
        <Rect
          key={id}
          {...otherProps}
          stroke={strokeColor}
          strokeWidth={1}
          draggable={isDraggable}
          onClick={handleClick}
        />
      );
    case "circle":
      return (
        <Circle
          key={id}
          {...otherProps}
          stroke={strokeColor}
          strokeWidth={2}
          draggable={isDraggable}
          onClick={handleClick}
        />
      );
    case "arrow":
      return (
        <Arrow
          key={id}
          {...otherProps}
          stroke={strokeColor}
          strokeWidth={2}
          draggable={isDraggable}
          onClick={handleClick}
        />
      );
    case "scribble":
      return (
        <Line
          key={id}
          {...otherProps}
          stroke={strokeColor}
          strokeWidth={2}
          lineCap="round"
          lineJoin="round"
          draggable={isDraggable}
          onClick={handleClick}
        />
      );
    default:
      return null;
  }
};

export default ShapeRenderer;
