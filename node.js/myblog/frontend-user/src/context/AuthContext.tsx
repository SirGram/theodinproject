import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/api/api';

  type AuthContextType = {
    auth: any ;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
  };
  export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
  );
  
  export function useAuth(): AuthContextType {
    return useContext(AuthContext);
  }
export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


    async function login(username:string, password:string):Promise<void>{
        try {
          const response = await axios.post(`${baseUrl}/auth/login`, {
            username,
            password,
          });
          localStorage.setItem('token', response.data.access_token);
          setIsAuthenticated(true)
          setAuth(response.data.user)
          console.log(response.data)
        } catch (error) {
          console.error('Login failed', error);
        }
      }
      async function logout(){
        setAuth(null);
        setIsAuthenticated(false)
        localStorage.removeItem('token');
      }

      const value = { auth, isAuthenticated, login, logout }
     
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

