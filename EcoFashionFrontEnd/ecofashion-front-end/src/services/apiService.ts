import axios from "axios";

// Cấu hình base URL cho API từ environment variable
// Trong development mode, sử dụng proxy để tránh CORS issues
const API_BASE_URL = import.meta.env.DEV
  ? "/api" // Sử dụng proxy của Vite
  : import.meta.env.VITE_API_BASE_URL || "https://localhost:7265/api";

// Tạo axios instance với cấu hình mặc định
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

// Interface cho login request
export interface LoginRequest {
  email: string;
  password: string;
}

// Interface cho register request
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword?: string;
}

// Interface cho user response
export interface UserResponse {
  id: string;
  email: string;
  name?: string;
  token?: string;
}

// Interface cho API response
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// API functions
export const authApi = {
  // Đăng nhập
  login: async (credentials: LoginRequest): Promise<UserResponse> => {
    try {
      console.log("🔍 API Login Request:", {
        url: `${API_BASE_URL}/User/login`,
        payload: credentials,
      });

      const response = await apiClient.post<ApiResponse<UserResponse>>(
        "/User/login",
        credentials
      );

      console.log("✅ API Login Response:", response.data);

      if (response.data.success && response.data.data) {
        const user = response.data.data;

        // Lưu token và thông tin user vào localStorage
        if (user.token) {
          localStorage.setItem("authToken", user.token);
        }
        localStorage.setItem("userInfo", JSON.stringify(user));

        return user;
      } else {
        throw new Error(response.data.message || "Đăng nhập thất bại");
      }
    } catch (error: any) {
      console.error("❌ API Login Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.title) {
        throw new Error(error.response.data.title);
      } else if (error.response?.status === 400) {
        throw new Error("Thông tin đăng nhập không hợp lệ");
      } else if (error.response?.status === 401) {
        throw new Error("Email hoặc mật khẩu không đúng");
      } else if (error.response?.status >= 500) {
        throw new Error("Lỗi server, vui lòng thử lại sau");
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Lỗi kết nối đến server");
      }
    }
  },

  // Đăng ký
  register: async (userData: RegisterRequest): Promise<UserResponse> => {
    try {
      console.log("🔍 API Register Request:", {
        url: `${API_BASE_URL}/User/register`,
        payload: {
          ...userData,
          password: "[HIDDEN]",
          confirmPassword: "[HIDDEN]",
        },
      });

      const response = await apiClient.post<ApiResponse<UserResponse>>(
        "/User/register",
        userData
      );

      console.log("✅ API Register Response:", response.data);

      if (response.data.success && response.data.data) {
        const user = response.data.data;

        // Lưu token và thông tin user vào localStorage
        if (user.token) {
          localStorage.setItem("authToken", user.token);
        }
        localStorage.setItem("userInfo", JSON.stringify(user));

        return user;
      } else {
        throw new Error(response.data.message || "Đăng ký thất bại");
      }
    } catch (error: any) {
      console.error("❌ API Register Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.title) {
        throw new Error(error.response.data.title);
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

  // Đăng xuất
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/User/logout");
    } catch (error) {
      // Vẫn thực hiện logout local dù API call fail
      console.warn("Logout API call failed, but continuing with local logout");
    } finally {
      // Xóa thông tin đăng nhập khỏi localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: (): UserResponse | null => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      return null;
    }
  },

  // Kiểm tra user có đang đăng nhập không
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("authToken");
    const userInfo = localStorage.getItem("userInfo");
    return !!(token && userInfo);
  },

  // Test API connection
  testConnection: async (): Promise<boolean> => {
    try {
      console.log("🔍 Testing API connection to:", API_BASE_URL);
      const response = await apiClient.get("/health-check");
      console.log("✅ API connection test successful:", response.data);
      return true;
    } catch (error: any) {
      console.error("❌ API connection test failed:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      return false;
    }
  },

  // Alternative login function để thử các format response khác nhau
  loginAlternative: async (
    credentials: LoginRequest
  ): Promise<UserResponse> => {
    try {
      console.log("🔍 Alternative API Login Request:", {
        url: `${API_BASE_URL}/User/login`,
        payload: credentials,
      });

      const response = await apiClient.post("/User/login", credentials);

      console.log("✅ Alternative API Login Response:", response.data);

      // Thử nhiều format response khác nhau
      let user: UserResponse;

      // Format 1: { success: true, data: {...} }
      if (response.data.success && response.data.data) {
        user = response.data.data;
      }
      // Format 2: Direct user object
      else if (response.data.id || response.data.email) {
        user = response.data;
      }
      // Format 3: { user: {...}, token: "..." }
      else if (response.data.user) {
        user = {
          ...response.data.user,
          token: response.data.token,
        };
      }
      // Format 4: { access_token: "...", user: {...} }
      else if (response.data.access_token) {
        user = {
          ...response.data.user,
          token: response.data.access_token,
        };
      } else {
        throw new Error("Format response không được hỗ trợ");
      }

      // Lưu token và thông tin user vào localStorage
      if (user.token) {
        localStorage.setItem("authToken", user.token);
      }
      localStorage.setItem("userInfo", JSON.stringify(user));

      return user;
    } catch (error: any) {
      console.error("❌ Alternative API Login Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data?.title) {
        throw new Error(error.response.data.title);
      } else if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.response?.status === 400) {
        throw new Error("Thông tin đăng nhập không hợp lệ");
      } else if (error.response?.status === 401) {
        throw new Error("Email hoặc mật khẩu không đúng");
      } else if (error.response?.status >= 500) {
        throw new Error("Lỗi server, vui lòng thử lại sau");
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error("Lỗi kết nối đến server");
      }
    }
  },

  // Quick test function để thử các field name variants
  testLoginVariants: async (email: string, password: string): Promise<any> => {
    const variants = [
      // Variant 1: Standard
      { email, password },
      // Variant 2: Username
      { username: email, password },
      // Variant 3: Capitalized
      { Email: email, Password: password },
      // Variant 4: Custom naming
      { userEmail: email, userPassword: password },
      // Variant 5: PascalCase
      { UserEmail: email, UserPassword: password },
    ];

    const endpoints = [
      "/User/login",
      "/Auth/login",
      "/Account/login",
      "/api/login",
    ];

    console.log("🧪 Testing login variants...");

    for (const endpoint of endpoints) {
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        try {
          console.log(`Testing ${endpoint} with variant ${i + 1}:`, variant);

          const response = await apiClient.post(endpoint, variant);

          console.log(
            `✅ SUCCESS with ${endpoint} variant ${i + 1}:`,
            response.data
          );
          return {
            success: true,
            endpoint,
            variant: i + 1,
            data: response.data,
          };
        } catch (error: any) {
          console.log(
            `❌ Failed ${endpoint} variant ${i + 1}:`,
            error.response?.status,
            error.response?.data
          );
        }
      }
    }

    throw new Error("All variants failed");
  },
};

export default apiClient;
