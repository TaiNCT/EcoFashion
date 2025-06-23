import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../services/AuthContext";
import { CircularProgress, Box } from "@mui/material";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Hiển thị loading trong lúc check authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Nếu user null và không loading, điều hướng đến login
  if (user === null) {
    return null;
  }

  return <>{children}</>;
}
