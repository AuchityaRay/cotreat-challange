import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const handleStorageChange = () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setIsLoggedIn(true);
        fetchUsername(userId);
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    };

    // Call handleStorageChange initially to set the state based on the current local storage
    handleStorageChange();

    // Set up event listener to listen for changes in local storage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const fetchUsername = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Failed to fetch username:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUsername('');
  };

  return {
    isLoggedIn,
    username,
    logout,
  };
};

export default useAuth;
