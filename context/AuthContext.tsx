"use client"
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';


interface AuthContextType {
  user: any | null;
  login: (userId: string, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const userId = localStorage.getItem('userId');
    const access_token = localStorage.getItem('useraccess');

    if (userId && access_token) {
      login(userId, access_token);
    } else {
      setIsLoading(false); 
    }
  }, []);

  const login = async (userId: string, token: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('useraccess');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
