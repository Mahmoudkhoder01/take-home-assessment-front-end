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
import flagIcon from "../../ICONS/flag.png";

// import components
import TodoForm, { TodoData } from "../../Components/TodoForm/TodoForm";
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
  const [isCreateTodo, setIsOpen] = useState(false);

  const [isEditTodo, setIsEditTodo] = useState(false);

  const [isDeleteTodo, setIsDeleteTodo] = useState(false);

  const [todoData, setTodoData] = useState({});

  const [todoId, setTodoId] = useState(0);

  const [showCompleted, setShowCompleted] = useState(false);

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

    if (showCompleted) {
      // Show completed tasks
      if (todo.completed) {
        todosByDate[dateLabel].push(todo);
      }
    } else {
      // Show active tasks
      todosByDate[dateLabel].push(todo);
    }
  });

  const handleOpenEdit = (todoData: object, id: number) => {
    setIsOpen(true);
    setIsEditTodo(true);
    setTodoData(todoData);
    setTodoId(id);
  };

  const handleOpenDelete = (id: number) => {
    setIsDeleteTodo(true);
    setTodoId(id);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className={classes.contentWrapper}>
        {Object.keys(todosByDate).length === 0 ? (
          <div className={classes.noData}>No todos yet.</div>
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
                          <div className={classes.topIcon}>
                            {todo.completed && (
                              <img
                                src={completedIcon}
                                alt="completed-icon"
                                className={`${classes.icon} ${classes.completedIcon}`}
                              />
                            )}
                            <img
                              src={flagIcon}
                              alt="flag-icon"
                              className={`${classes.icon} ${classes.flagIcon}`}
                            />
                            <div className={classes.priorityText}>
                              {todo.priority}
                            </div>
                          </div>
                          <div>
                            <img
                              src={editIcon}
                              alt="edit-icon"
                              className={`${classes.icon} ${classes.editIcon}`}
                              onClick={() => handleOpenEdit(todo, todo.id)}
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
      <div className={classes.bottomIconWrapper}>
        <div className={classes.bottomIcon} onClick={() => setIsOpen(true)}>
          <img
            src={plusIcon}
            alt="plus-icon"
            className={classes.bottomIconImage}
          />
        </div>
        <div
          className={classes.bottomIcon}
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <img
            src={completedIcon}
            alt="completed-icon"
            className={classes.bottomIconImage}
          />
        </div>
      </div>
      {isCreateTodo && (
        <TodoForm
          setIsOpen={setIsOpen}
          isCreateTodo={isCreateTodo}
          reFetch={refetch}
          dataObject={todoData as TodoData}
          setIsEditTodo={setIsEditTodo}
          todoId={todoId}
          isEditTodo={isEditTodo}
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
