import { Rect } from "react-konva";
import { SelectIcon } from "../assets";
import { ACTIONS } from "../constants";

const buttonTypes = [
  {
    action: ACTIONS.SELECT,
    icon: null,
    label: <img src={SelectIcon} alt="select" width="20" />,
  },
  {
    action: ACTIONS.RECTANGLE,
    icon: Rect,
    label: "Rect",
  },
  {
    action: ACTIONS.CIRCLE,
    icon: Rect,
    label: "Circle",
    size: "1.5rem",
  },
  {
    action: ACTIONS.ARROW,
    icon: Rect,
    label: "Arrow",
    size: "2rem",
  },
  {
    action: ACTIONS.SCRIBBLE,
    icon: Rect,
    label: "Draw",
    size: "1.5rem",
  },
];

export default buttonTypes;
