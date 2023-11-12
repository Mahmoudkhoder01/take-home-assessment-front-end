import React from "react";
import classes from "./Input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  label,
  value,
  onChange,
  error,
  fullWidth,
}) => {
  const inputClassName = fullWidth ? classes.inputFullWidth : classes.input;

  return (
    <div className={classes.inputWrapper}>
      <label>{label}</label>
      <input
        className={classes.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};

export default Input;
