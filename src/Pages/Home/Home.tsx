import { getUserById } from "../../API/USERAPI";
import Box from "../../Components/Box/Box";
import classes from "./Home.module.css";
import { useQuery } from "@tanstack/react-query";

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
  const storedUser = localStorage.getItem("userInfo");
  const userIdObject = storedUser && JSON.parse(storedUser);
  const userId = userIdObject && userIdObject.id;

  const { data, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

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

  if (Object.keys(todosByDate).length === 0) {
    return <div>No todos yet.</div>;
  }

  return (
    <div className={classes.contentWrapper}>
      {Object.entries(todosByDate).map(([date, todos], index) => (
        <div className={classes.tasksWrapper} key={index}>
          <div className={classes.date}>{date}</div>
          {todos.map((todo, todoIndex) => (
            <Box
              key={todoIndex}
              content={<p>{todo.description}</p>}
              adjustPadding
            />
          ))}
        </div>
      ))}
    </div>
  );
}
