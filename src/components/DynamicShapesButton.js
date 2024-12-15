import "../styles/style.css";

const DynamicShapesButton = ({
  action,
  setAction,
  children,
  icon: Icon,
  size = "1.5rem",
}) => {
  return (
    <button className="dynamicShapesButton" onClick={() => setAction(action)}>
      {Icon && <Icon size={size} />}
      {children}
    </button>
  );
};
export default DynamicShapesButton;
