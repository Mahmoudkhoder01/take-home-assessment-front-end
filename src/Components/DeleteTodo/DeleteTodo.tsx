import React, { FC, useEffect, useState } from "react";
import Box from "../Box/Box";
import Button from "../ReusableTools/Button/Button";
import classes from "./DeleteTodo.module.css";
import { deleteTodo } from "../../API/TODOAPI";

interface DeleteTodoProps {
  setIsDeleteTodo: (value: boolean) => void;
  reFetch: () => void;
  todoId: number;
}

const DeleteTodo: FC<DeleteTodoProps> = ({
  setIsDeleteTodo,
  todoId,
  reFetch,
}) => {
  const [currentTodoId, setCurrentTodoId] = useState(todoId);

  useEffect(() => {
    // Update the currentTodoId whenever todoId prop changes
    setCurrentTodoId(todoId);
  }, [todoId]);

  const handleClose = () => {
    setIsDeleteTodo(false);
  };

  const handleDeleteTodo = async () => {
    setIsDeleteTodo(false);
    await deleteTodo(currentTodoId);
    reFetch();
  };

  return (
    <>
      <div className={classes.backDrop}>
        <Box
          content={
            <>
              <p>Are you sure you want to delete this todo?</p>
              <Button text="Yes" onClick={handleDeleteTodo} />
              <Button text="No" onClick={handleClose} />
            </>
          }
        />
      </div>
    </>
  );
};

export default DeleteTodo;
