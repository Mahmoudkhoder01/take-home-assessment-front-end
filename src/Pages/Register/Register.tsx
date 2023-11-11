import { ChangeEvent, useState } from "react";
import Box from "../../Components/Box/Box";
import Input from "../../Components/ReusableTools/Input/Input";
import classes from "./Register.module.css";

export default function Register() {
  const [data, setData] = useState({
    name: "",
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
      value: data.name,
      label: "Name",
      placeholder: "Enter your name",
      type: "text",
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        handleInputChange("name", event.target.value),
    },
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

  return (
    <Box
      content={inputFields.map((field, index) => (
        <Input
          label={field.label}
          key={index}
          type={field.type}
          placeholder={field.placeholder}
          onChange={field.onChange}
          value={field.value}
        />
      ))}
    />
  );
}
