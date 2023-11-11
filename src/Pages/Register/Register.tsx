import { ChangeEvent, useState } from "react";
import Box from "../../Components/Box/Box";
import Input from "../../Components/ReusableTools/Input/Input";
import classes from "./Register.module.css";
import Button from "../../Components/ReusableTools/Button/Button";

export default function Register() {
  const [sbumit, setSubmit] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [field]: "",
      general: "",
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
      error: error.name,
    },
    {
      value: data.email,
      label: "Email",
      placeholder: "Enter your email",
      type: "text",
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        handleInputChange("email", event.target.value),
      error: error.email,
    },
    {
      value: data.password,
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        handleInputChange("password", event.target.value),
      error: error.password,
    },
  ];

  const handleSubmit = () => {
    if (!data.name && !data.email && !data.password) {
      setError((prevError) => ({
        ...prevError,
        general: "Please fill all fields",
      }));
      return;
    }

    const errorFields = [];

    if (!data.name) {
      setError((prevError) => ({
        ...prevError,
        name: "Name is required",
      }));
      errorFields.push("Name");
    } else if (data.name.length < 3) {
      setError((prevError) => ({
        ...prevError,
        name: "Name should be at least 3 characters",
      }));
      errorFields.push("Name");
    }

    if (!data.email) {
      setError((prevError) => ({
        ...prevError,
        email: "Email is required",
      }));
      errorFields.push("Email");
    } else if (data.email.length < 3) {
      setError((prevError) => ({
        ...prevError,
        email: "Email should be at least 3 characters",
      }));
      errorFields.push("Email");
    }

    if (!data.password) {
      setError((prevError) => ({
        ...prevError,
        password: "Password is required",
      }));
      errorFields.push("Password");
    } else if (data.password) {
      // Validate password format
      const passwordRegex = /^(?=.*[A-Za-z\d]).{8,}$/;
      if (!passwordRegex.test(data.password)) {
        setError((prevError) => ({
          ...prevError,
          password: "Password should be at least 8 characters",
        }));
        errorFields.push("Password");
      }
    }

    if (errorFields.length > 0) {
      return;
    }

    try {
      setSubmit(true);

      
    } catch (error) {}
  };
  return (
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
                error={field.error}
              />
            ))}
          </div>
          {error.general && <p className={classes.error}>{error.general}</p>}
          <Button text="Register" onClick={handleSubmit} />
        </>
      }
    />
  );
}
