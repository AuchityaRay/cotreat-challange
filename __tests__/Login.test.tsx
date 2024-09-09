// __test__/Login.test.ts

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';  // for extended matchers like 'toBeInTheDocument'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Login from '../app/login/page';

// Mock axios and next/router
jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock localStorage.setItem
Storage.prototype.setItem = jest.fn();

describe('Login Page', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });
    jest.clearAllMocks();
  });

  test('renders the login form correctly', () => {
    render(<Login />);

    // Check if the heading, input field, and button are rendered
    expect(screen.getByText('PicShare')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('displays an error if username is empty', async () => {
    render(<Login />);
  
    fireEvent.submit(screen.getByText('Log In'));
  
    // Use a regex to match the relevant part of the error message
    expect(await screen.findByText(/Username is required\./i)).toBeInTheDocument();
  });

  test('submits the form successfully when username is valid', async () => {
    const userId = '12345';
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { userId } });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validUser' }, // valid username
    });
    fireEvent.submit(screen.getByText('Log In'));

   
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/user/login', { username: 'validUser' }, expect.anything());
    });

   
    expect(localStorage.setItem).toHaveBeenCalledWith('userId', userId);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test('displays an error when login request fails', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validUser' },
    });
    fireEvent.submit(screen.getByText('Log In'));

    //  "Failed to login. Please try again."
    await waitFor(() => {
      expect(screen.getByText(/Failed to login\. Please try again\./i)).toBeInTheDocument();
    });
  });
});
