import { Rect } from "react-konva";
import {
  Arrow,
  ArrowIcon,
  CircleIcon,
  Draw,
  RectangleIcon,
  SelectIcon,
} from "../assets";
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
    label: <img src={RectangleIcon} alt="select" width="20" />,
  },
  {
    action: ACTIONS.CIRCLE,
    icon: Rect,
    label: <img src={CircleIcon} alt="select" width="20" />,
    size: "1.5rem",
  },
  {
    action: ACTIONS.ARROW,
    icon: Rect,
    label: <img src={ArrowIcon} alt="select" width="20" />,
    size: "2rem",
  },
  {
    action: ACTIONS.SCRIBBLE,
    icon: Rect,
    label: <img src={Draw} alt="select" width="20" />,
    size: "1.5rem",
  },
];

export default buttonTypes;
