import { FC } from "react";
import calsses from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={calsses.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
