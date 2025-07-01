import { useEffect, useState } from "react";
import { useAuth } from "../services/user/AuthContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";
import {
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lấy returnUrl từ query params, mặc định về homepage
  const getRedirectPath = () => {
    const returnUrl = searchParams.get("returnUrl");
    // redirect về homepage sau khi login thành công
    return returnUrl || "/";
  };

  useEffect(() => {
    if (user != null) {
      navigate(getRedirectPath());
    }
  }, [user, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .min(3, "Mật khẩu phải có ít nhất 3 ký tự")
      .required("Mật khẩu là bắt buộc"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await signIn(values.email, values.password);
      toast.success("Đăng nhập thành công!", {
        position: "top-center",
      });
      navigate(getRedirectPath());
    } catch (error: any) {
      toast.error(error.message || "Đăng nhập thất bại", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // Demo function - không có chức năng thực tế
    toast.info(
      "Chức năng đăng nhập Google sẽ được phát triển trong tương lai!",
      {
        position: "top-center",
      }
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      {/* Login Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          p: 4,
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#4caf50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 2,
              fontSize: "24px",
            }}
          >
            🌱
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#333",
              fontSize: "28px",
              mb: 1,
            }}
          >
            EcoFashion
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#333",
              mb: 1,
              fontSize: "24px",
            }}
          >
            Đăng nhập
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Chào mừng bạn quay trở lại!
          </Typography>
        </Box>

        {/* Login Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Box mb={3}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="Nhập email của bạn"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&.Mui-focused fieldset": {
                        borderColor: "#4caf50",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4caf50",
                    },
                  }}
                />
              </Box>

              <Box mb={3}>
                <TextField
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&.Mui-focused fieldset": {
                        borderColor: "#4caf50",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4caf50",
                    },
                  }}
                />
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{
                        color: "#4caf50",
                        "&.Mui-checked": {
                          color: "#4caf50",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Ghi nhớ đăng nhập
                    </Typography>
                  }
                />
                <Link
                  to="/forgot-password"
                  style={{
                    color: "#4caf50",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  Quên mật khẩu?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#4caf50",
                  fontWeight: 600,
                  fontSize: "16px",
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                  "&:hover": {
                    backgroundColor: "#45a049",
                    boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                  },
                  "&:disabled": {
                    backgroundColor: "#ccc",
                  },
                  mb: 3,
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Đăng nhập"
                )}
              </Button>

              {/* Divider */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  my: 3,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: "1px",
                    backgroundColor: "#ddd",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    px: 2,
                    backgroundColor: "white",
                  }}
                >
                  Hoặc
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    height: "1px",
                    backgroundColor: "#ddd",
                  }}
                />
              </Box>

              {/* Google Sign In Button */}
              <Button
                onClick={handleGoogleSignIn}
                variant="outlined"
                fullWidth
                disabled={true} // Tạm thời disable
                startIcon={<FaGoogle />}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  color: "#666",
                  borderColor: "#ddd",
                  fontWeight: 500,
                  textTransform: "none",
                  backgroundColor: "#f9f9f9",
                  mb: 3,
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    borderColor: "#ccc",
                  },
                  "&:disabled": {
                    opacity: 0.6,
                  },
                }}
              >
                Đăng nhập với Google (Sắp có)
              </Button>

              {/* SignUp Link */}
              <Box textAlign="center">
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Chưa có tài khoản?{" "}
                  <Link
                    to="/signup"
                    style={{
                      color: "#4caf50",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Đăng ký ngay
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
