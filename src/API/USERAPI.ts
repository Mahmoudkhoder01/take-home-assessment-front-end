import axios from "axios";

const API_URL = "http://localhost:5000/";

export interface User {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}auth/register`, user);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // Axios error with a response
      console.error("Error registering user:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      // Handle other types of errors, e.g., network errors
      console.error("Error registering user:", error);
      throw new Error("Registration failed");
    }
  }
};
