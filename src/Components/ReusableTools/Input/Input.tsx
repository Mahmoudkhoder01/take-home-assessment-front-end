import React, { ChangeEvent } from "react";
import classes from "./Input.module.css";

type InputType = "text" | "date" | "number" | "email";

interface InputProps {
  type: InputType;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      className={classes.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
