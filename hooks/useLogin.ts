import { useState } from 'react';
import axios from 'axios';

export const useLogin = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string) => {
    try {
      setLoading(true); // Start loading

      const response = await axios.post('http://localhost:3000/user/login', {
        username,
      });

      setUserId(response.data.userId);
      setError(null);
      localStorage.setItem('userId', response.data.userId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return {
    login,
    userId,
    loading,
    error,
  };
};
