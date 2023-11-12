import { useState } from "react";
import { getUserById } from "../../API/USERAPI";
import Box from "../../Components/Box/Box";
import classes from "./Home.module.css";
import { useQuery } from "@tanstack/react-query";

// import icons
import plusIcon from "../../ICONS/plus.png";
import editIcon from "../../ICONS/pencil.png";
import deleteIcon from "../../ICONS/bin.png";
import completedIcon from "../../ICONS/check-mark.png";
import CreateTodo from "../../Components/CreateTodo/CreateTodo";
import DeleteTodo from "../../Components/DeleteTodo/DeleteTodo";

interface Todo {
  id: number;
  description: string;
  priority: string;
  userId: number;
  date: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [isCreateTodo, setIscreateTodo] = useState(false);

  const [isDeleteTodo, setIsDeleteTodo] = useState(false);

  const [todoId, setTodoId] = useState(0);

  const storedUser = localStorage.getItem("userInfo");

  const userIdObject = storedUser && JSON.parse(storedUser);

  const userId = userIdObject && userIdObject.id;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  // Display a loading indicator while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.result) {
    // Handle the case where data is missing or doesn't have the expected structure
    return <div>Data is missing or invalid.</div>;
  }

  const today = new Date().toDateString();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateString = tomorrow.toDateString();

  // Group todos by date
  const todosByDate: Record<string, Todo[]> = {};

  data?.result.Todo.forEach((todo: Todo) => {
    const todoDate = new Date(todo.date).toDateString();
    const dateLabel =
      todoDate === today
        ? "Today"
        : todoDate === tomorrowDateString
        ? "Tomorrow"
        : todo.date.split("T")[0];

    if (!todosByDate[dateLabel]) {
      todosByDate[dateLabel] = [];
    }

    todosByDate[dateLabel].push(todo);
  });

  const handleOpenDelete = (id: number) => {
    setIsDeleteTodo(true);
    setTodoId(id);
  };

  return (
    <div className={classes.content}>
      <div className={classes.contentWrapper}>
        {Object.keys(todosByDate).length === 0 ? (
          <div>No todos yet.</div>
        ) : (
          Object.entries(todosByDate).map(([date, todos], index) => (
            <div className={classes.tasksWrapper} key={index}>
              <div className={classes.date}>{date}</div>
              {todos.map((todo, todoIndex) => (
                <div key={todoIndex}>
                  <Box
                    content={
                      <div className={classes.todoWrapper}>
                        <p>{todo.description}</p>
                        <div>
                          {todo.completed && (
                            <div className={classes.topIcon}>
                              <img
                                src={completedIcon}
                                alt="completed-icon"
                                className={`${classes.icon} ${classes.completedIcon}`}
                              />
                            </div>
                          )}
                          <div>
                            <img
                              src={editIcon}
                              alt="edit-icon"
                              className={`${classes.icon} ${classes.editIcon}`}
                            />
                            <img
                              src={deleteIcon}
                              alt="delete-icon"
                              className={`${classes.icon} ${classes.deleteIcon}`}
                              onClick={() => handleOpenDelete(todo.id)}
                            />
                          </div>
                        </div>
                      </div>
                    }
                    adjustPadding
                  />
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <div
        className={classes.bottomIconWrapper}
        onClick={() => setIscreateTodo(true)}
      >
        <img src={plusIcon} alt="plus-icon" className={classes.bottomIcon} />
      </div>
      {isCreateTodo && (
        <CreateTodo
          setIscreateTodo={setIscreateTodo}
          isCreateTodo={isCreateTodo}
          reFetch={refetch}
        />
      )}
      {isDeleteTodo && (
        <DeleteTodo
          reFetch={refetch}
          setIsDeleteTodo={setIsDeleteTodo}
          todoId={todoId}
        />
      )}
    </div>
  );
}
