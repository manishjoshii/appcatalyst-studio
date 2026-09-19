import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  api,
  getAuthToken,
  setAuthToken as persistAuthToken,
  removeAuthToken as clearAuthToken,
  getUserInfo,
  setUserInfo as persistUserInfo,
  removeUserInfo as clearUserInfo,
  AUTH_TOKEN_KEY,
} from "@/lib/api";
import {
  LoginCredentials,
  SignupRequest,
  AuthResponse,
  UserProfileResponse,
} from "@/lib/types";

interface AuthContextType {
  user: UserProfileResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  signup: (data: SignupRequest) => Promise<AuthResponse>;
  logout: () => void;
  refreshProfile: () => Promise<UserProfileResponse | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  const [user, setUser] = useState<UserProfileResponse | null>(() => getUserInfo());
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    // If token exists, we do an initial verification fetch
    return !!getAuthToken();
  });

  const logout = useCallback(() => {
    clearAuthToken();
    clearUserInfo();
    setToken(null);
    setUser(null);
    setIsLoading(false);
  }, []);

  const refreshProfile = useCallback(async (): Promise<UserProfileResponse | null> => {
    const currentToken = getAuthToken();
    if (!currentToken) {
      setUser(null);
      return null;
    }

    try {
      const profile = await api.getProfile();
      setUser(profile);
      persistUserInfo(profile);
      return profile;
    } catch (error) {
      console.warn("Failed to fetch user profile, session might have expired:", error);
      logout();
      return null;
    }
  }, [logout]);

  // Initial authentication verification
  useEffect(() => {
    const initAuth = async () => {
      const currentToken = getAuthToken();
      if (currentToken) {
        setToken(currentToken);
        await refreshProfile();
      }
      setIsLoading(false);
    };

    initAuth();
  }, [refreshProfile]);

  // Listen to 401 unauthorized events across the application
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_TOKEN_KEY) {
        if (!e.newValue) {
          logout();
        } else {
          setToken(e.newValue);
          refreshProfile();
        }
      }
    };

    window.addEventListener("app:unauthorized", handleUnauthorized);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("app:unauthorized", handleUnauthorized);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [logout, refreshProfile]);

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await api.login(credentials);
      persistAuthToken(response.token);
      setToken(response.token);

      if (response.user) {
        persistUserInfo(response.user);
        setUser(response.user);
      } else {
        // Fallback to fetch profile if user object isn't returned directly
        await refreshProfile();
      }

      return response;
    } finally {
      setIsLoading(false);
    }
  }, [refreshProfile]);

  const signup = useCallback(async (data: SignupRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await api.signup(data);
      persistAuthToken(response.token);
      setToken(response.token);

      if (response.user) {
        persistUserInfo(response.user);
        setUser(response.user);
      } else {
        await refreshProfile();
      }

      return response;
    } finally {
      setIsLoading(false);
    }
  }, [refreshProfile]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    signup,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
