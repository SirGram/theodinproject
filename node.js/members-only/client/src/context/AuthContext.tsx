import axios from "axios";
import { createContext, useState, useContext, ReactNode } from "react";

type AuthResponse = {
  message: string;
  user: LoggedUser;
  token:string
};

export interface LoggedUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  isPro:boolean;
}

export type AuthContextType = {
  userData: LoggedUser | undefined;
  setUserData:(user: LoggedUser | undefined)=>void;
  isAuthenticated: boolean;
  setIsAuthenticated:(value: boolean)=>void;
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
  newMessage: (
    content: string,
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
      const {token} = response.data
      
      localStorage.setItem('token', token);

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
      const {user, token} = response.data;
      
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUserData(user)

      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  async function logout() {
    setIsAuthenticated(false);
    setUserData(undefined);
    localStorage.clear();
  }

  async function newMessage(content: string): Promise<void> {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3001/api/messages",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Create message error:", error);
      throw error;
    }
  }
  async function deleteMessage(content: string): Promise<void> {
    if (!isAuthenticated) {
      throw new Error("User is not authenticated");
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3001/api/messages",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Delete message error:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, isAuthenticated,setIsAuthenticated, register, login, logout, newMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
}
