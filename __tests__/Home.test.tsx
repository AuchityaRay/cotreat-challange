import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page'; // adjust the import path as necessary
import useAuth from '@/hooks/useAuth';
import { LOGIN } from '@/routes/routes';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';

// Mock the hooks
jest.mock('@/hooks/useAuth');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the Card component
jest.mock('@/components/Card', () => () => <div>Card Component</div>);

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login prompt when user is not logged in', () => {
    // Mock useAuth to return a not logged-in user
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      username: '',
      logout: jest.fn(),
    });

    render(<Home />);

    // Check that the login prompt is displayed
    expect(screen.getByText(/Login to start sharing your favourite pictures with others!/i)).toBeInTheDocument();
    expect(screen.getByText('Login')).toHaveAttribute('href', LOGIN);

    // Check that the Card component is rendered
    expect(screen.getByText('Card Component')).toBeInTheDocument();
  });

  test('renders the Card component when user is logged in', () => {
    // Mock useAuth to return a logged-in user
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      username: 'testuser',
      logout: jest.fn(),
    });

    render(<Home />);

    // Check that the login prompt is NOT displayed
    expect(screen.queryByText(/Login to start sharing your favourite pictures with others!/i)).not.toBeInTheDocument();

    // Check that the Card component is rendered
    expect(screen.getByText('Card Component')).toBeInTheDocument();
  });

  test('login link points to the correct route', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      username: '',
      logout: jest.fn(),
    });

    render(<Home />);

    // Check the link href attribute
    const loginLink = screen.getByText('Login');
    expect(loginLink).toHaveAttribute('href', LOGIN);
  });
});
