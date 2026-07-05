import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi } from "../api/auth";
import {
    getToken,
    removeToken,
    saveToken,
} from "../services/auth.service";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = await getToken();

    if (token) {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }

  async function login(email: string, password: string) {
    const response = await loginApi({
      email,
      password,
    });

    await saveToken(response.access_token);

    setIsAuthenticated(true);
  }

  async function logout() {
    await removeToken();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}