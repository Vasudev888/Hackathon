import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock authentication function
    // In a real app, you would validate credentials against a backend
    
    // Mock validation for demo accounts
    if (password && (
      email === 'student@example.com' || 
      email === 'teacher@example.com' || 
      email === 'principal@example.com'
    )) {
      const role = email.split('@')[0] as 'student' | 'teacher' | 'principal';
      setUser({ email, role });
      return true;
    }
    
    return false;
  };

  const logout = () => {
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