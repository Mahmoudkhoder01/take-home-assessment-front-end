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
      console.error("Error registering user:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      // Handle other types of errors, e.g., network errors
      console.error("Error registering user:", error);
      throw new Error("Registration failed");
    }
  }
};
