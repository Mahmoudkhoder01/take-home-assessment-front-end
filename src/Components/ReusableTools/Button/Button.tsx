import { FC } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
