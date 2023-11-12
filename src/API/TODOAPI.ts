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

export interface EditTodoResponse {
  message: string;
  data_updated: {
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

export interface EditTodoRequest {
  description: string;
  priority: string;
  date: string;
  completed?: boolean;
}

export const updateTodo = async (
  id: number,
  todo: EditTodoRequest
): Promise<EditTodoResponse> => {
  try {
    const response = await axios.put<EditTodoResponse>(
      `${API_URL}todo/${id}`,
      todo
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to update todo");
    }
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}todo/${id}`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to delete todo");
    }
  }
};
