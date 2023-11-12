import { ChangeEvent, useState } from "react";
import classes from "./Register.module.css";
import { registerUser } from "../../API/USERAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// import components
import Box from "../../Components/Box/Box";
import Input from "../../Components/ReusableTools/Input/Input";
import Button from "../../Components/ReusableTools/Button/Button";

export default function Register() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    status,
    error: registerError,
    mutate,
  } = useMutation({
    mutationFn: registerUser,

    onSuccess: (newUser) => {
      setData({
        name: "",
        email: "",
        password: "",
      });

      setError({
        name: "",
        email: "",
        password: "",
        general: "",
      });

      localStorage.setItem("userInfo", JSON.stringify(newUser.result.userInfo));

      localStorage.setItem("token", JSON.stringify(newUser.result.token));

      navigate("/");

      queryClient.setQueryData(
        ["user", newUser.result.userInfo.id],
        newUser.result
      );
    },
  });

  const isPending = status === "pending";

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
      mutate(data);
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        general: `${error}`,
      }));
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="content">
      <Box
        content={
          <>
            <div className={classes.InputsWrapper}>
              {inputFields.map((field, index) => (
                <Input
                  key={index}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={field.onChange}
                  value={field.value}
                  error={field.error}
                />
              ))}
            </div>
            {registerError && (
              <p className={classes.error}>{registerError.message}</p>
            )}
            {error.general && <p className="error">{error.general}</p>}
            <Button
              text={isPending ? "Submitting..." : "Register"}
              onClick={handleSubmit}
            />
          </>
        }
      />
    </div>
  );
}
