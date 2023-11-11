import { ChangeEvent, useState } from "react";
import Input from "../../Components/ReusableTools/Input/Input";
import classes from "./Login.module.css";
import Button from "../../Components/ReusableTools/Button/Button";
import Box from "../../Components/Box/Box";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const inputFields = [
    {
      value: data.email,
      label: "Email",
      placeholder: "Enter your email",
      type: "text",
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        handleInputChange("email", event.target.value),
    },
    {
      value: data.password,
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        handleInputChange("password", event.target.value),
    },
  ];

  const handleSubmit = () => {
    try {
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Box
        content={
          <>
            <div className={classes.InputsWrapper}>
              {inputFields.map((field, index) => (
                <Input
                  label={field.label}
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={field.onChange}
                  value={field.value}
                />
              ))}
            </div>
            <Button text={"Login"} onClick={handleSubmit} />
          </>
        }
      />
    </>
  );
}
