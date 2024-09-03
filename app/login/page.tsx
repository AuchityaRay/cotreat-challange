"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      
      router.replace('/');
    }
  }, [router]);
  const validateForm = () => {
    if (username.trim() === '') {
      setError('Username is required.');
      return false;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return false;
    }
    setError(''); // Clear any previous errors
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/user/login', 
        { username },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const { userId } = response.data;
      setUserId(userId);
      localStorage.setItem('userId', userId); 
      setError('');
      
      router.push('/');
     
   
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden h-screen">
      <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center shadow-lg w-[980px] h-[700px]">
        <h1 className="text-3xl font-bold text-center mb-4 font-robotoSerif">PicShare</h1>
        <p className="text-center text-gray-500 mb-8">Login to start sharing</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-daybreak-blue text-white py-2 rounded-lg transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {userId && <p className="text-green-500 mt-4">Logged in! Redirecting to home...</p>}
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      </div>
    </div>
  );
};

export default Login;
