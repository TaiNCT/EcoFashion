import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { authApi } from "./apiService";
import type { UserResponse, LoginRequest, RegisterRequest } from "./apiService";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextType {
  user: UserResponse | null;
  createUser: (email: string, password: string) => Promise<UserResponse>;
  signIn: (email: string, password: string) => Promise<UserResponse>;
  googleSignIn: () => Promise<UserResponse>;
  logout: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Khởi tạo user từ localStorage khi app load
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const currentUser = authApi.getCurrentUser();
        if (currentUser && authApi.isAuthenticated()) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const createUser = async (
    email: string,
    password: string
  ): Promise<UserResponse> => {
    try {
      const userData: RegisterRequest = { email, password };
      const user = await authApi.register(userData);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };
  const signIn = async (
    email: string,
    password: string
  ): Promise<UserResponse> => {
    try {
      const credentials: LoginRequest = { email, password };

      // Thử login method chính trước
      try {
        const user = await authApi.login(credentials);
        setUser(user);
        return user;
      } catch (error: any) {
        console.warn(
          "Main login failed, trying alternative method:",
          error.message
        );

        // Nếu login chính thất bại, thử alternative method
        const user = await authApi.loginAlternative(credentials);
        setUser(user);
        return user;
      }
    } catch (error) {
      throw error;
    }
  };
  const googleSignIn = async (): Promise<UserResponse> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Tạo user object từ Firebase user
      const firebaseUser = result.user;
      const userData: UserResponse = {
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || "Google User",
        token: await firebaseUser.getIdToken(),
      };

      setUser(userData);
      // Lưu token vào localStorage để tương thích với API authentication
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Logout cả API và Firebase
      await Promise.all([authApi.logout(), firebaseSignOut(auth)]);
      setUser(null);
    } catch (error) {
      // Vẫn clear user state ngay cả khi có lỗi
      setUser(null);
      throw error;
    }
  };
  const value: AuthContextType = {
    user,
    createUser,
    signIn,
    googleSignIn,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserAuth = (): AuthContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
};
