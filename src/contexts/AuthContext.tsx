import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: { email: string; password: string; name: string }[] = [
  { email: "demo@typeform.com", password: "demo123", name: "Demo User" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("typeform_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: foundUser.email,
        name: foundUser.name,
      };
      setUser(userData);
      localStorage.setItem("typeform_user", JSON.stringify(userData));
      return {};
    }

    // Allow any email/password for demo
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
    };
    setUser(newUser);
    localStorage.setItem("typeform_user", JSON.stringify(newUser));
    return {};
  };

  const signup = async (email: string, password: string, name: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const exists = mockUsers.find((u) => u.email === email);
    if (exists) {
      return { error: "User already exists" };
    }

    mockUsers.push({ email, password, name });
    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
    };
    setUser(userData);
    localStorage.setItem("typeform_user", JSON.stringify(userData));
    return {};
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("typeform_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
