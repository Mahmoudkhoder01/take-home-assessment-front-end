import { ChangeEvent, useState } from "react";
import Input from "../../Components/ReusableTools/Input/Input";
import classes from "./Login.module.css";
import Button from "../../Components/ReusableTools/Button/Button";
import Box from "../../Components/Box/Box";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../API/USERAPI";

export default function Login() {
  const queryClient = useQueryClient();

  const { error: loginError, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (loginUser) => {
      setData({
        email: "",
        password: "",
      });

      setError("");

      localStorage.setItem(
        "userInfo",
        JSON.stringify(loginUser.result.userInfo)
      );
      
      localStorage.setItem("token", JSON.stringify(loginUser.result.token));
      
      queryClient.setQueryData(
        ["user", loginUser.result.userInfo.id],
        loginUser.result
      );
    },
  });

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

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
    if (!data.email && !data.password) {
      setError("Please fill all feilds");
      return;
    }
    try {
      mutate(data);
    } catch (error) {
      setError(`${error}`);
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
            {error && <p className={classes.error}>{error}</p>}
            <Button text={"Login"} onClick={handleSubmit} />
          </>
        }
      />
    </>
  );
}
