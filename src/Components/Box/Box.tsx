import { ReactNode } from "react";
import classes from "./Box.module.css";

type BoxProps = {
  content: ReactNode;
  adjustPadding?: boolean;
};

const Box: React.FC<BoxProps> = ({ content, adjustPadding }) => {
  const boxClass = adjustPadding
    ? `${classes.box} ${classes.adjustedPadding}`
    : classes.box;

  return <div className={boxClass}>{content}</div>;
};

export default Box;
