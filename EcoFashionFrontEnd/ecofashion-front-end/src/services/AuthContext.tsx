import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { authApi } from "./apiService";
import type { UserResponse } from "./apiService";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "./firebase";

const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const getUserFromToken = (token: string) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded) return null;

    // Backend ASP.NET Core sử dụng các claim names chuẩn
    return {
      userId:
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
      fullName:
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email:
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
      phone:
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
        ],
      username: decoded.username,
      role: decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
      roleId: decoded.roleId,
      status: decoded.status,
      createdAt: decoded.createdAt,
      exp: decoded.exp,
      iat: decoded.iat,
    };
  } catch (error) {
    console.error("Error getting user from token:", error);
    return null;
  }
};

interface AuthContextType {
  user: UserResponse | null;
  createUser: (email: string, password: string) => Promise<UserResponse>;
  signIn: (email: string, password: string) => Promise<UserResponse>;
  googleSignIn: () => Promise<UserResponse>;
  logout: () => Promise<void>;
  loading: boolean;
  // Thêm các function mới để làm việc với JWT
  getTokenInfo: () => any | null;
  isTokenValid: () => boolean;
  refreshUserFromToken: () => void;
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
        const token = localStorage.getItem("authToken");
        if (token && !isTokenExpired(token)) {
          // Lấy thông tin user từ JWT token
          const tokenPayload = getUserFromToken(token);
          if (tokenPayload) {
            const userFromToken: UserResponse = {
              userId: tokenPayload.userId || 0,
              fullName:
                tokenPayload.fullName ||
                tokenPayload.email?.split("@")[0] ||
                "User",
              email: tokenPayload.email || "",
              phone: tokenPayload.phone || null,
              username: tokenPayload.username || null,
              role: tokenPayload.role || "User",
              roleId: tokenPayload.roleId || 0,
              status: tokenPayload.status || "Active",
              createdAt: tokenPayload.createdAt || new Date().toISOString(),
            };
            setUser(userFromToken);
            // Cập nhật lại localStorage với thông tin từ token
            localStorage.setItem("userInfo", JSON.stringify(userFromToken));
          }
        } else {
          // Token hết hạn hoặc không có, clear localStorage
          localStorage.removeItem("authToken");
          localStorage.removeItem("userInfo");
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userInfo");
        setUser(null);
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
      const response = await authApi.register(email, password);

      // Sử dụng thông tin user từ response backend và lưu token
      const user = response.user;
      const token = response.token;

      // Cập nhật state và localStorage
      setUser(user);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userInfo", JSON.stringify(user));

      console.log("User registered successfully:", user);
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
      const response = await authApi.login(email, password);

      // Sử dụng thông tin user từ response backend và lưu token
      const user = response.user;
      const token = response.token;

      // Cập nhật state và localStorage
      setUser(user);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userInfo", JSON.stringify(user));

      console.log("User logged in successfully:", user);
      return user;
    } catch (error) {
      throw error;
    }
  };
  const googleSignIn = async (): Promise<UserResponse> => {
    try {
      // Kiểm tra xem Firebase có khả dụng không
      if (!auth) {
        throw new Error(
          "Đăng nhập Google hiện tại không khả dụng. Vui lòng sử dụng email/password để đăng nhập."
        );
      }

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Tạo user object từ Firebase user với format mới
      const firebaseUser = result.user;
      const userData: UserResponse = {
        userId: 0, // Firebase users get temporary ID
        fullName: firebaseUser.displayName || "Google User",
        email: firebaseUser.email || "",
        phone: firebaseUser.phoneNumber || undefined,
        username: undefined,
        role: "User",
        roleId: 0,
        status: "Active",
        createdAt: new Date().toISOString(),
      };

      setUser(userData);
      // Lưu token vào localStorage cho Google authentication
      const token = await firebaseUser.getIdToken();
      localStorage.setItem("authToken", token);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      return userData;
    } catch (error) {
      throw error;
    }
  };

  // Thêm các function mới để làm việc với JWT
  const getTokenInfo = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    return decodeJWT(token);
  };

  const isTokenValid = (): boolean => {
    const token = localStorage.getItem("authToken");
    if (!token) return false;
    return !isTokenExpired(token);
  };

  const refreshUserFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (token && !isTokenExpired(token)) {
      const tokenPayload = getUserFromToken(token);
      if (tokenPayload) {
        const userFromToken: UserResponse = {
          userId: tokenPayload.userId || user?.userId || 0,
          fullName: tokenPayload.fullName || user?.fullName || "User",
          email: tokenPayload.email || user?.email || "",
          phone: tokenPayload.phone || user?.phone || undefined,
          username: tokenPayload.username || user?.username || undefined,
          role: tokenPayload.role || user?.role || "User",
          roleId: tokenPayload.roleId || user?.roleId || 0,
          status: tokenPayload.status || user?.status || "Active",
          createdAt:
            tokenPayload.createdAt ||
            user?.createdAt ||
            new Date().toISOString(),
        };
        setUser(userFromToken);
        localStorage.setItem("userInfo", JSON.stringify(userFromToken));
      }
    } else {
      // Token hết hạn, clear user
      setUser(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Logout API và Firebase (nếu khả dụng)
      const logoutPromises = [authApi.logout()];
      if (auth) {
        logoutPromises.push(firebaseSignOut(auth));
      }
      await Promise.all(logoutPromises);
    } catch (error) {
      console.error("Logout error:", error);
      // Tiếp tục clear user state ngay cả khi có lỗi logout từ server
    } finally {
      // Luôn clear user state và localStorage
      setUser(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
    }
  };
  const value: AuthContextType = {
    user,
    createUser,
    signIn,
    googleSignIn,
    logout,
    loading,
    getTokenInfo,
    isTokenValid,
    refreshUserFromToken,
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
