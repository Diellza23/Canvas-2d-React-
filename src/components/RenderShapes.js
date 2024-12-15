import { Circle, Rect } from "react-konva";

const RenderShapes = ({
  shapes,
  setShapes,
  setSelectedId,
  selectedId,
  attachTransformer,
  handleTransformEnd,
}) => {
  const shapeComponents = {
    circle: Circle,
    rectangle: Rect,
  };

  return shapes.map((shape, index) => {
    const ShapeComponent = shapeComponents[shape.type];
    if (!ShapeComponent) return null;

    return (
      <ShapeComponent
        key={`${shape.id}-${index}`}
        {...shape}
        draggable
        stroke="#000"
        strokeWidth={1}
        onClick={() => setSelectedId(shape.id)}
        onTap={() => setSelectedId(shape.id)}
        onDragEnd={(e) =>
          setShapes((prevShapes) =>
            prevShapes.map((s) =>
              s.id === shape.id ? { ...s, x: e.target.x(), y: e.target.y() } : s
            )
          )
        }
        onTransformEnd={(e) => handleTransformEnd(shape.id, e, setShapes)}
        ref={(node) => selectedId === shape.id && attachTransformer(node)}
      />
    );
  });
};

export default RenderShapes;
