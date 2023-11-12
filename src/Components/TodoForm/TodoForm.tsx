import { useState, useEffect } from "react";
import Box from "../Box/Box";
import Input from "../ReusableTools/Input/Input";
import classes from "./TodoForm.module.css";
import Button from "../ReusableTools/Button/Button";
import { createTodo, updateTodo } from "../../API/TODOAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import closeIcon from "../../ICONS/x-mark.png";

export interface TodoData {
  id: number;
  description: string;
  priority: string;
  date: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoFormProps {
  isCreateTodo: boolean;
  setIsOpen: (value: boolean) => void;
  reFetch: () => void;
  setIsEditTodo?: (value: boolean) => void;
  dataObject?: TodoData;
  isEditTodo?: boolean;
  todoId?: number;
}

const TodoForm: React.FC<TodoFormProps> = ({
  isCreateTodo,
  setIsOpen,
  reFetch,
  isEditTodo,
  setIsEditTodo,
  dataObject,
  todoId,
}) => {
  const storedUserInfo = localStorage.getItem("userInfo");

  const userId = storedUserInfo && JSON.parse(storedUserInfo);

  useEffect(() => {
    if (isEditTodo && dataObject) {
      // If in edit mode and dataObject is provided, set the data state
      setData({
        description: dataObject.description || "",
        priority: dataObject.priority || "",
        userId: "",
        date: dataObject.date || "",
        completed: dataObject.completed || false,
      });
    }
  }, [isEditTodo, dataObject]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTodo,

    onSuccess: (newTodo) => {
      setData({
        description: "",
        priority: "",
        userId: userId.id,
        date: "",
        completed: false,
      });

      setError({
        description: "",
        priority: "",
        date: "",
        general: "",
      });

      reFetch();

      queryClient.setQueryData(["todo", newTodo], newTodo.result);
    },
  });

  const { mutate: updateTodoFn } = useMutation({
    mutationFn: updateTodo,

    onSuccess: (editTodo) => {
      setData({
        description: "",
        priority: "",
        userId: userId.id,
        date: "",
        completed: false,
      });

      setError({
        description: "",
        priority: "",
        date: "",
        general: "",
      });

      reFetch();

      queryClient.setQueryData(["todo", editTodo], editTodo);
    },
  });

  const [data, setData] = useState({
    description: "",
    priority: "",
    userId: userId.id,
    date: "",
    completed: false,
  });

  // Update the default date value when the component renders
  useEffect(() => {
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split("T")[0];
    setData((prevData) => ({
      ...prevData,
      date: currentDateStr,
    }));
  }, []);

  const [error, setError] = useState({
    description: "",
    priority: "",
    date: "",
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

  const handleSubmit = () => {
    try {
      if (!data.description && !data.priority && !data.date) {
        setError((prevError) => ({
          ...prevError,
          general: "Please fill all fields",
        }));
        return;
      }

      const errorFields = [];

      if (!data.description) {
        setError((prevError) => ({
          ...prevError,
          description: "Description is required",
        }));
        errorFields.push("Description");
      }
      if (data.description.length < 3) {
        setError((prevError) => ({
          ...prevError,
          description: "Description should be at least 3 characters",
        }));
        errorFields.push("Description");
      }

      // Define a regex pattern for "YYYY-MM-DD" format
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}/;

      if (!data.date) {
        setError((prevError) => ({
          ...prevError,
          date: "Date is required",
        }));
        errorFields.push("Date");
      } else if (!dateFormatRegex.test(data.date)) {
        setError((prevError) => ({
          ...prevError,
          date: "Invalid date format. Use YYYY-MM-DD.",
        }));
        errorFields.push("Date");
      } else {
        const inputDate = new Date(data.date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (inputDate.getTime() < currentDate.getTime()) {
          setError((prevError) => ({
            ...prevError,
            date: "Date should not be in the past.",
          }));
          errorFields.push("Date");
        }
      }

      if (!data.priority) {
        setError((prevError) => ({
          ...prevError,
          priority: "Priority is required",
        }));
        errorFields.push("Priority");
      } else if (
        data.priority !== "HIGH" &&
        data.priority !== "MEDIUM" &&
        data.priority !== "LOW"
      ) {
        setError((prevError) => ({
          ...prevError,
          priority: "Invalid priority value. Please use HIGH, MEDIUM, or LOW.",
        }));
        errorFields.push("Priority");
      }

      if (errorFields.length > 0) {
        return;
      }

      if (isEditTodo && todoId !== undefined) {
        const editData = {
          id: todoId,
          todo: {
            description: data.description,
            priority: data.priority,
            date: data.date,
            completed: true,
          },
        };
        updateTodoFn(editData);
        setIsOpen(false);
        return;
      }

      mutate(data);

      setIsOpen(false);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleCloseForm = () => {
    setIsOpen(false);
    setIsEditTodo?.(false);
  };

  return (
    <>
      {isCreateTodo && (
        <div>
          <img
            src={closeIcon}
            alt="close-icon"
            className={classes.closeIcon}
            onClick={handleCloseForm}
          />
          <div className={classes.backDrop}>
            <>
              <Box
                content={
                  <>
                    <Input
                      type="text"
                      label="Description"
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Enter description"
                      value={data.description}
                      error={error.description}
                    />
                    <div className={classes.inlineInputs}>
                      <Input
                        type="text"
                        label="Date"
                        onChange={(e) =>
                          handleInputChange("date", e.target.value)
                        }
                        placeholder="YYYY-MM-DD"
                        value={data.date}
                        error={error.date}
                      />
                      <Input
                        type="text"
                        label="Description"
                        onChange={(e) =>
                          handleInputChange("priority", e.target.value)
                        }
                        placeholder="(e.g., HIGH, MEDIUM, LOW)"
                        value={data.priority}
                        error={error.priority}
                      />
                    </div>
                    {error.general && <p className="error">{error.general}</p>}
                    <Button
                      text={isEditTodo ? "Edit" : "Create"}
                      onClick={handleSubmit}
                    />
                  </>
                }
              />
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoForm;
