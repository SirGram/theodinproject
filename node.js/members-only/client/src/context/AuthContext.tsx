import axios from "axios";
import { createContext, useState, useContext, ReactNode } from "react";

type AuthResponse = {
  message: string;
  user: LoggedUser;
};

export interface LoggedUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

export type AuthContextType = {
  userData: LoggedUser | undefined;
  isAuthenticated: boolean;
  register: (
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<AuthResponse | undefined>;
  login: (
    userName: string,
    password: string
  ) => Promise<AuthResponse | undefined>;
  logout:()=>void
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<LoggedUser | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function register(
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<AuthResponse | undefined> {
    const body = { userName, firstName, lastName, email, password };
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:3001/api/auth/register",
        body
      );

      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async function login(
    email: string,
    password: string
  ): Promise<AuthResponse | undefined> {
    const body = { email, password };
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:3001/api/auth/signin",
        body
      );
      const userData: LoggedUser = response.data.user;
      setIsAuthenticated(true);

      setUserData(userData);
      console.log(userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }
  async function logout() {
    setIsAuthenticated(false);
    setUserData(undefined);
  }

  return (
    <AuthContext.Provider
      value={{ userData, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
