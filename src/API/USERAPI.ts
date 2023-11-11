import axios from "axios";

const API_URL = "http://localhost:5000/";

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface DataResponse {
  message: string;
  result: {
    token: string;
    userInfo: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export const registerUser = async (
  user: RegisterUserRequest
): Promise<DataResponse> => {
  try {
    const requestData: RegisterUserRequest = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const response = await axios.post<DataResponse>(
      `${API_URL}auth/register`,
      requestData
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // Axios error with a response
      throw new Error(error.response.data.message);
    } else {
      // Handle other types of errors, e.g., network errors
      throw new Error("Registration failed");
    }
  }
};

export interface LoginUserRequest {
  email: string;
  password: string;
}

export const loginUser = async (
  user: LoginUserRequest
): Promise<DataResponse> => {
  try {
    const requestData: LoginUserRequest = {
      email: user.email,
      password: user.password,
    };

    const response = await axios.post<DataResponse>(
      `${API_URL}auth/login`,
      requestData
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // Axios error with a response
      console.error("Error login user:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      // Handle other types of errors, e.g., network errors
      console.error("Error login user:", error);
      throw new Error("Login failed");
    }
  }
};

export interface UserData {
  message: string;
  result: {
    id: number;
    name: string;
    email: string;
    password: string;
  };
}

export const getUserById = async (userId: number): Promise<UserData> => {
  try {
    const response = await axios.get<UserData>(`${API_URL}user/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Axios error with a response
      throw new Error(error.response.data.message);
    } else {
      // Handle other types of errors, e.g., network errors
      throw new Error("Failed to get user by ID");
    }
  }
};
