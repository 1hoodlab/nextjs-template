// shared/api/mock/auth-service.ts

// Type for user
interface User {
  id: string;
  email: string;
  name: string;
}

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock users database
const mockUsers: User[] = [
  { id: "1", email: "admin@example.com", name: "Admin User" },
  { id: "2", email: "user@example.com", name: "Regular User" },
];

// Token utilities for session persistence
const TOKEN_KEY = "mock_auth_token";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const mockAuthService = {
  // Login user
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> => {
    // Simulate API call delay
    await delay(800);

    // Find user with matching email
    const user = mockUsers.find((u) => u.email === email);

    // In a real app, you'd hash and compare passwords
    // For mock, just check if password is "password"
    if (!user || password !== "password") {
      throw new Error("Invalid credentials");
    }

    // Create a mock token (in real app would be JWT)
    const token = `mock_token_${user.id}_${Date.now()}`;
    setToken(token);

    return user;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await delay(300);
    removeToken();
  },

  // Register new user
  register: async ({
    email,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<User> => {
    await delay(1000);

    // Check if user already exists
    if (mockUsers.some((u) => u.email === email)) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email,
      name,
    };

    // Add to mock database
    mockUsers.push(newUser);

    // Set auth token
    const token = `mock_token_${newUser.id}_${Date.now()}`;
    setToken(token);

    return newUser;
  },

  // Check if user is authenticated
  getCurrentUser: async (): Promise<User | null> => {
    await delay(500);

    const token = getToken();

    // If no token, user is not authenticated
    if (!token) {
      return null;
    }

    // In a real app, you'd decode the JWT and get the user ID
    // For mock, we'll extract user ID from our mock token format
    try {
      const userId = token.split("_")[1];
      const user = mockUsers.find((u) => u.id === userId);

      if (!user) {
        removeToken();
        return null;
      }

      return user;
    } catch {
      removeToken();
      return null;
    }
  },
};
