"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Assuming fetching user details and setting the logged-in state
      fetchUserDetails(userId);
    }
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const login = (username: string) => {
    // Simulating a successful login
    setUsername(username);
    setIsLoggedIn(true);
    localStorage.setItem("userId", "someUserId"); // Normally, this would come from the API response
  };

  const logout = () => {
    setUsername(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
