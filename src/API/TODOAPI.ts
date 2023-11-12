import axios from "axios";

const API_URL = "http://localhost:5000/";

export interface Todo {
  id: number;
  description: string;
  priority: string;
  userId: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  User: {
    id: number;
    name: string;
    email: string;
    password: string;
  };
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${API_URL}todo`);
  return response.data;
};

export interface CreateTodoResponse {
  message: string;
  result: {
    id: number;
    description: string;
    priority: string;
    userId: number;
    date: string;
    completed: false;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreateTodoRequest {
  description: string;
  priority: string;
  userId: number;
  date: string;
  completed?: boolean;
}

export const createTodo = async (
  todo: CreateTodoRequest
): Promise<CreateTodoResponse> => {
  try {
    const response = await axios.post<CreateTodoResponse>(
      `${API_URL}todo`,
      todo
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to craete todo");
    }
  }
};
