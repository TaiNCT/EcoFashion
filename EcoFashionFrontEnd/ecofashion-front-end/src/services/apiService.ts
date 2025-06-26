import axios from "axios";

const API_BASE_URL = import.meta.env.DEV
  ? "/api" // Sử dụng proxy trong dev mode
  : "https://localhost:7265/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm token vào header nếu có
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response và error
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  passwordHash: string; // Đổi tên field theo backend
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword?: string;
}

// Interface cho user response
export interface UserResponse {
  userId: number;
  fullName: string;
  email: string;
  phone?: string;
  username?: string;
  role: string;
  roleId: number;
  status: string;
  createdAt: string;
}

// Interface cho login response từ backend
export interface LoginResponse {
  token: string;
  user: UserResponse;
  expiresAt: string;
}

// Interface cho API response từ backend thực tế
export interface ApiResponse<T> {
  success: boolean;
  result: T;
  errorMessage: string | null;
}

export const authApi = {
  login: async (
    email: string,
    password: string
  ): Promise<{ token: string; user: UserResponse }> => {
    try {
      const credentials: LoginRequest = {
        email,
        passwordHash: password, // Đổi tên field theo backend
      };

      console.log("🔐 Login Request:", { email, password: "***" });

      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        "/User/login",
        credentials
      );

      if (response.data.success && response.data.result) {
        const { token, user, expiresAt } = response.data.result;

        console.log("✅ Login Success:", {
          userId: user.userId,
          email: user.email,
          role: user.role,
          expiresAt,
        });

        localStorage.setItem("authToken", token);
        localStorage.setItem("tokenExpiresAt", expiresAt);

        return { token, user };
      } else {
        const errorMsg = response.data.errorMessage || "Đăng nhập thất bại";
        console.error("❌ Login Failed:", errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      console.error("🚨 Login Error:", error);

      if (error.response?.data?.errorMessage) {
        throw new Error(error.response.data.errorMessage);
      } else if (error.response?.status === 400) {
        throw new Error("Email hoặc mật khẩu không hợp lệ");
      } else if (error.response?.status === 401) {
        throw new Error("Email hoặc mật khẩu không đúng");
      } else if (error.response?.status === 404) {
        throw new Error("Tài khoản không tồn tại");
      } else if (error.response?.status >= 500) {
        throw new Error("Lỗi server, vui lòng thử lại sau");
      } else if (
        error.code === "ECONNREFUSED" ||
        error.message.includes("Network Error")
      ) {
        throw new Error(
          "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
        );
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Đã xảy ra lỗi không xác định");
      }
    }
  },

  register: async (
    email: string,
    password: string
  ): Promise<{ token: string; user: UserResponse }> => {
    try {
      const userData: RegisterRequest = { email, password: password };

      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        "/User/register",
        userData
      );

      if (response.data.success && response.data.result) {
        const { token, user, expiresAt } = response.data.result;

        localStorage.setItem("authToken", token);
        localStorage.setItem("tokenExpiresAt", expiresAt);

        return { token, user };
      } else {
        const errorMsg = response.data.errorMessage || "Đăng ký thất bại";
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      if (error.response?.data?.errorMessage) {
        throw new Error(error.response.data.errorMessage);
      } else if (error.response?.status === 400) {
        throw new Error("Thông tin đăng ký không hợp lệ");
      } else if (error.response?.status === 409) {
        throw new Error("Email đã được sử dụng");
      } else if (error.response?.status >= 500) {
        throw new Error("Lỗi server, vui lòng thử lại sau");
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Lỗi kết nối đến server");
      }
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/User/logout");
    } catch (error) {
      console.warn("Logout API call failed, but continuing with local logout");
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
    }
  },

  getCurrentUser: (): UserResponse | null => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("authToken");
    return !!token;
  },
};

export default apiClient;
