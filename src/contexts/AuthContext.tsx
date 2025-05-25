import axios from 'axios';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import {  useNavigate } from 'react-router-dom';

interface User {
  email: string;
  role: 'student' | 'teacher' | 'principal';
}


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<String | null>(null);
  let flag = false;
  const login =  (email: string, password: string): boolean => {
    
    axios.post("http://10.0.0.4:8080/api/token/", {
      email: email,
      password: password
    }).then(e => {
      console.log(e)
      setUser(e.data.access)
      localStorage.setItem("token",e.data.access)
      
      return true;
    })
    axios.get("http://10.0.0.4:8080/api/role/",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          } 
        }).then(e=>{
          localStorage.setItem("type",e.data.user_type.name)
        })
    return true;


  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}