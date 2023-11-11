import { ReactNode } from "react";
import classes from "./Box.module.css";

type BoxProps = {
  content: ReactNode;
};

const Box: React.FC<BoxProps> = ({ content }) => {
  return <div className={classes.box}>{content}</div>;
};

export default Box;
