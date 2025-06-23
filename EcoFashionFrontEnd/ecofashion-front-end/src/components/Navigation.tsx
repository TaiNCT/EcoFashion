import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../services/AuthContext";
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navigation() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast.success("Đăng xuất thành công!", {
        position: "top-center",
      });
    } catch (error: any) {
      toast.error("Lỗi khi đăng xuất", {
        position: "bottom-center",
      });
    }
    handleMenuClose();
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ bgcolor: "transparent", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 3,
            background: "linear-gradient(to right, #d4e9b4, #f9f4a8)",
            boxShadow: 3,
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#f0f8e2",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HomeIcon
                sx={{
                  fontSize: 30,
                  color: "#3e4b3b",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": { color: "#2e7d32", transform: "scale(1.1)" },
                }}
              />
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  ml: 1,
                  fontFamily: "Georgia, serif",
                  color: "#3e4b3b",
                  transition: "color 0.3s",
                  "&:hover": { color: "#2e7d32" },
                }}
              >
                EcoFashion
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Link
              to="/ourstory"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InfoIcon
                sx={{
                  fontSize: 24,
                  color: "#4b4b4b",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": {
                    color: "#ff8a65",
                    transform: "rotate(15deg) scale(1.1)",
                  },
                }}
              />
              <Typography
                variant="button"
                sx={{
                  color: "#4b4b4b",
                  ml: 0.5,
                  "&:hover": { color: "#ff8a65" },
                }}
              >
                Our Story
              </Typography>
            </Link>

            {user && (
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DashboardIcon
                  sx={{
                    fontSize: 24,
                    color: "#4b4b4b",
                    transition: "color 0.3s, transform 0.3s",
                    "&:hover": {
                      color: "#42a5f5",
                      transform: "rotate(-15deg) scale(1.1)",
                    },
                  }}
                />
                <Typography
                  variant="button"
                  sx={{
                    color: "#4b4b4b",
                    ml: 0.5,
                    "&:hover": { color: "#42a5f5" },
                  }}
                >
                  Dashboard
                </Typography>
              </Link>
            )}

            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ContactMailIcon
                sx={{
                  fontSize: 24,
                  color: "#4b4b4b",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": {
                    color: "#ffca28",
                    transform: "rotate(15deg) scale(1.1)",
                  },
                }}
              />
              <Typography
                variant="button"
                sx={{
                  color: "#4b4b4b",
                  ml: 0.5,
                  "&:hover": { color: "#ffca28" },
                }}
              >
                Contact
              </Typography>
            </Link>

            {/* Authentication Section */}
            {!user ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: "#4b4b4b",
                    borderColor: "#4b4b4b",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "rgba(75, 75, 75, 0.1)",
                      borderColor: "#2e7d32",
                      color: "#2e7d32",
                    },
                  }}
                >
                  Đăng nhập
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    backgroundColor: "#2e7d32",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#1b5e20",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Đăng ký
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {" "}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#4b4b4b",
                    fontWeight: 500,
                  }}
                >
                  Xin chào, {user.name || user.email?.split("@")[0]}
                </Typography>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    color: "#4b4b4b",
                    "&:hover": {
                      backgroundColor: "rgba(75, 75, 75, 0.1)",
                    },
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 28 }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      to="/dashboard"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <DashboardIcon sx={{ mr: 1, fontSize: 20 }} />
                      Dashboard
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
