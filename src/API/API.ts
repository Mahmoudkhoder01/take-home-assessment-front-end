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

