import { ACTIONS } from "../constants";
import { shapeConfigs } from "./shapeconfigurations";

export const handleDeselect = (e, setSelectedId, transformerRef) => {
  if (e.target === e.target.getStage()) {
    setSelectedId(null);
    transformerRef.current.nodes([]);
  }
};

export const handleDragEnd = (id, attrs, setObjects) => {
  setObjects((prevObjects) =>
    prevObjects.map((obj) => (obj.id === id ? { ...obj, ...attrs } : obj))
  );
};

export const handleDelete = (
  selectedId,
  setObjects,
  setRectangles,
  setCircles,
  setArrows,
  setScribbles,
  setShapes,
  setSelectedId
) => {
  if (selectedId) {
    setObjects((prev) => prev.filter((obj) => obj.id !== selectedId));
    setRectangles((prev) => prev.filter((obj) => obj.id !== selectedId));
    setCircles((prev) => prev.filter((obj) => obj.id !== selectedId));
    setArrows((prev) => prev.filter((obj) => obj.id !== selectedId));
    setScribbles((prev) => prev.filter((obj) => obj.id !== selectedId));
    setShapes((prevShapes) =>
      prevShapes.filter((shape) => shape.id !== selectedId)
    );
    setSelectedId(null);
  }
};

// static shapes
export const addShape = (type, objects, setObjects) => {
  const id = `${type}${objects.length + 1}`;
  const newShape = shapeConfigs[type]
    ? shapeConfigs[type](id)
    : shapeConfigs.default(id);
  setObjects((prev) => [...prev, newShape]);
};

// upload image
export const handleUpload = (e, objects, setObjects) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const id = `image${objects.length + 1}`;
      const newImage = {
        id,
        type: "image",
        x: 100,
        y: 100,
        src: reader.result,
        width: 200,
        height: 200,
      };
      setObjects((prev) => [...prev, newImage]);
      localStorage.setItem(id, JSON.stringify(newImage));
    };
    reader.readAsDataURL(file);
  }
};

// change color of selected dynamicshape
export const handleChangeColor = (
  color,
  setBackgroundColor,
  setShapes,
  selectedId
) => {
  setBackgroundColor(color);
  setShapes((prevShapes) =>
    prevShapes.map((shape) =>
      shape.id === selectedId ? { ...shape, fill: color } : shape
    )
  );
};
// dynamic with color change
export const handleAddRectangle = (shapes, setShapes) => {
  const newRectangle = {
    id: `rect-${Date.now()}`,
    x: 50 + shapes.length * 10,
    y: 50 + shapes.length * 10,
    width: 100,
    height: 100,
    fill: "#fff", // Default color
    rotation: 0,
    type: "rectangle",
  };
  setShapes((prevShapes) => [...prevShapes, newRectangle]);
};

export const handleAddCircle = (shapes, setShapes) => {
  const newCircle = {
    id: `circle-${Date.now()}`,
    x: 50 + shapes.length * 10,
    y: 50 + shapes.length * 10,
    radius: 50,
    fill: "#fff",
    rotation: 0,
    type: "circle",
  };
  setShapes((prevShapes) => [...prevShapes, newCircle]);
};

export const handleTransformEnd = (id, e, setShapes) => {
  const node = e.target;
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  node.scaleX(1);
  node.scaleY(1);

  setShapes((prevShapes) =>
    prevShapes.map((shape) =>
      shape.id === id
        ? {
            ...shape,
            x: node.x(),
            y: node.y(),

            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          }
        : shape
    )
  );
};
export function onPointerMove(
  action,
  isPaining,
  stageRef,
  setRectangles,
  currentShapeId,
  setCircles,
  setArrows,
  setScribbles
) {
  if (action === ACTIONS.SELECT || !isPaining.current) return;

  const stage = stageRef.current;
  const { x, y } = stage.getPointerPosition();

  const setShapeMap = {
    [ACTIONS.RECTANGLE]: setRectangles,
    [ACTIONS.CIRCLE]: setCircles,
    [ACTIONS.ARROW]: setArrows,
    [ACTIONS.SCRIBBLE]: setScribbles,
  };

  const setShape = setShapeMap[action];
  if (!setShape) return;

  const updateShape = (shape) => {
    if (shape.id !== currentShapeId.current) return shape;

    switch (action) {
      case ACTIONS.RECTANGLE:
        return {
          ...shape,
          width: x - shape.x,
          height: y - shape.y,
        };
      case ACTIONS.CIRCLE:
        return {
          ...shape,
          radius: Math.sqrt((y - shape.y) ** 2 + (x - shape.x) ** 2),
        };
      case ACTIONS.ARROW:
        return {
          ...shape,
          points: [shape.points[0], shape.points[1], x, y],
        };
      case ACTIONS.SCRIBBLE:
        return {
          ...shape,
          points: [...shape.points, x, y],
        };
      default:
        return shape;
    }
  };

  setShape((shapes) => shapes.map(updateShape));
}

export function onPointerDown(
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
) {
  if (action === ACTIONS.SELECT) return;

  const stage = stageRef.current;
  const { x, y } = stage.getPointerPosition();
  const id = uuidv4();

  currentShapeId.current = id;
  isPaining.current = true;

  const createShapeMap = {
    [ACTIONS.RECTANGLE]: {
      shape: { id, x, y, height: 20, width: 20, fillColor },
      setter: setRectangles,
    },
    [ACTIONS.CIRCLE]: {
      shape: { id, x, y, radius: 20, fillColor },
      setter: setCircles,
    },
    [ACTIONS.ARROW]: {
      shape: { id, points: [x, y, x + 20, y + 20], fillColor },
      setter: setArrows,
    },
    [ACTIONS.SCRIBBLE]: {
      shape: { id, points: [x, y], fillColor },
      setter: setScribbles,
    },
  };

  const shapeData = createShapeMap[action];
  if (!shapeData) return;

  shapeData.setter((shapes) => [...shapes, shapeData.shape]);
}

export const exportCanvas = (stageRef) => {
  const stage = stageRef.current;
  const dataURL = stage.toDataURL();
  const link = document.createElement("a");
  link.download = "canvas.png";
  link.href = dataURL;
  link.click();
};

export function onClick(e, id, action, setSelectedId, transformerRef) {
  if (action !== ACTIONS.SELECT) return;
  setSelectedId(id);
  const target = e.currentTarget;
  transformerRef.current.nodes([target]);
}

export const attachTransformer = (node, transformerRef) => {
  if (node && transformerRef.current) {
    transformerRef.current.nodes([node]);
    transformerRef.current.getLayer().batchDraw();
  }
};

export function onPointerUp(isPaining) {
  isPaining.current = false;
}
