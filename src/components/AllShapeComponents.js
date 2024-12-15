import buttonTypes from "./ButtonActions";
import DynamicShapesButton from "./DynamicShapesButton";
import DynamicShapesWithAllFunc from "./DynamicShapesWithAllFunc";
import StaticShapesButtons from "./StaticShapesButtons";
import "../styles/style.css";

const AllShapeComponents = ({
  shapeTypes,
  objects,
  setObjects,
  setAction,
  shapes,
  setShapes,
  selectedId,
  fillColor,
  setFillColor,
}) => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-column gap-2 allShapesContainer">
        <span className="spanStyle fw-medium">Static Shapes</span>
        <div className="d-flex gap-3 align-items-center staticContainer">
          {shapeTypes.map(({ type, icon }, index) => (
            <StaticShapesButtons
              key={`${type}-${index}`}
              type={type}
              icon={icon}
              objects={objects}
              setObjects={setObjects}
            />
          ))}
        </div>
      </div>

      <div className="d-flex flex-column gap-2 allShapesContainer">
        <span className="spanStyle fw-medium">Dynamic Shapes</span>
        <div className="flex justify-center items-center gap-3 p-2 bg-white">
          {buttonTypes.map(({ action, icon, label, size }) => (
            <DynamicShapesButton
              key={action}
              action={action}
              setAction={setAction}
              icon={icon}
              size={size}
            >
              {label}
            </DynamicShapesButton>
          ))}

          <button className="border-0">
            <input
              className="w-6 h-6"
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
            />
          </button>
        </div>
      </div>

      <DynamicShapesWithAllFunc
        shapes={shapes}
        setShapes={setShapes}
        selectedId={selectedId}
      />
    </div>
  );
};

export default AllShapeComponents;
