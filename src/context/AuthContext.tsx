import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll just simulate a successful login
    
    // Simple validation
    if (!username || !password) {
      return false;
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create a user object
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      name: username.includes('@') ? username.split('@')[0] : username,
      role,
    };
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
