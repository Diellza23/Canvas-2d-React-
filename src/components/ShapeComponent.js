import { Circle, Line, Rect, Shape, Star, Text } from "react-konva";
import DragImage from "./DragImage";

const ShapeComponent = ({
  type,
  obj,
  setSelectedId,
  handleDragEnd,
  selectedId,
  setObjects,
}) => {
  const props = {
    key: obj.id,
    draggable: true,
    onClick: () => setSelectedId(obj.id),
    onDragEnd: (e) =>
      handleDragEnd(
        obj.id,
        {
          x: e.target.x(),
          y: e.target.y(),
        },
        setObjects
      ),
  };

  switch (type) {
    case "rect":
      return (
        <Rect
          {...props}
          key={obj.id}
          x={obj.x}
          y={obj.y}
          width={obj.width}
          height={obj.height}
          fill={obj.fill}
        />
      );
    case "circle":
      return (
        <Circle
          {...props}
          key={obj.id}
          x={obj.x}
          y={obj.y}
          radius={obj.radius}
          fill={obj.fill}
        />
      );
    case "triangle":
      return (
        <Line
          {...props}
          key={obj.id}
          points={obj.points}
          fill={obj.fill}
          closed
        />
      );
    case "star":
      return (
        <Star
          {...props}
          key={obj.id}
          {...obj}
          points={obj.points}
          fill={obj.fill}
          closed
        />
      );
    case "emoji":
      return (
        <Text
          {...props}
          key={obj.id}
          {...obj}
          points={obj.points}
          fill={obj.fill}
          closed
        />
      );
    case "heart":
      return (
        <Shape
          {...props}
          key={obj.id}
          sceneFunc={(ctx, shape) => {
            const x = shape.getAttr("x");
            const y = shape.getAttr("y");
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x - 50, y - 50, x - 100, y + 50, x, y + 100);
            ctx.bezierCurveTo(x + 100, y + 50, x + 50, y - 50, x, y);
            ctx.closePath();
            ctx.fillStrokeShape(shape);
          }}
          points={obj.points}
          {...obj}
          fill={obj.fill}
          closed
        />
      );
    case "image":
      return (
        <DragImage
          key={obj.id}
          src={obj.src}
          x={obj.x}
          y={obj.y}
          width={obj.width}
          height={obj.height}
          isSelected={obj.id === selectedId}
          onSelect={() => setSelectedId(obj.id)}
          onChange={(newAttrs) => {
            setObjects((prev) =>
              prev.map((item) =>
                item.id === obj.id ? { ...item, ...newAttrs } : item
              )
            );
          }}
        />
      );
    default:
      return null;
  }
};

export default ShapeComponent;
