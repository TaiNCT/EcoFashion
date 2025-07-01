import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../services/user/AuthContext";
import { toast } from "react-toastify";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import PaletteIcon from "@mui/icons-material/Palette";

export default function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // Function để lấy tên hiển thị user
  const getUserDisplayName = () => {
    if (!user) return "";

    // Ưu tiên fullName, nếu không có thì lấy phần trước @ của email
    if (user.fullName && user.fullName.trim() !== "") {
      return user.fullName;
    }

    if (user.email) {
      return user.email.split("@")[0];
    }

    return "User";
  };

  // Function để lấy menu items dựa trên role
  const getMenuItems = () => {
    if (!user) return [];

    const role = user.role?.toLowerCase();
    const menuItems = [];

    switch (role) {
      case "designer":
        menuItems.push(
          {
            label: "Hồ Sơ Designer",
            path: "/designer/profile",
            icon: (
              <PersonIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
            ),
          },
          {
            label: "Sản Phẩm Cá Nhân",
            path: "/designer/products",
            icon: (
              <InventoryIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
            ),
          }
        );
        break;

      case "admin":
        menuItems.push(
          {
            label: "Bảng Điều Khiển",
            path: "/admin/dashboard",
            icon: (
              <DashboardIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
            ),
          },
          {
            label: "Quản Lý Đơn Đăng Ký",
            path: "/admin/applications",
            icon: (
              <InventoryIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
            ),
          },
          {
            label: "Quản Lý Users",
            path: "/admin/users",
            icon: (
              <PeopleIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
            ),
          }
        );
        break;

      case "supplier":
        menuItems.push(
          {
            label: "Hồ Sơ Nhà Cung Cấp",
            path: "/supplier/profile",
            icon: (
              <PersonIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
            ),
          },
          {
            label: "Quản Lý Kho Hàng",
            path: "/supplier/inventory",
            icon: (
              <InventoryIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
            ),
          }
        );
        break;

      case "customer":
      case "user":
      default:
        menuItems.push(
          {
            label: "Hồ Sơ Cá Nhân",
            path: "/profile",
            icon: (
              <PersonIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
            ),
          },
          {
            label: "Đơn Hàng",
            path: "/orders",
            icon: (
              <InventoryIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
            ),
          }
        );
        break;
    }

    // Thêm menu "Xem đơn đăng ký" cho tất cả user (trừ admin)
    if (role !== "admin") {
      menuItems.push({
        label: "Xem đơn đăng ký",
        path: "/my-applications",
        icon: (
          <InventoryIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
        ),
      });
    }

    // Thêm menu "Đăng ký tham gia" cho user chưa có role Designer/Supplier
    if (role !== "designer" && role !== "admin") {
      menuItems.push({
        label: "Đăng ký làm Designer",
        path: "/apply/designer",
        icon: <PaletteIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />,
      });
    }

    if (role !== "supplier" && role !== "admin") {
      menuItems.push({
        label: "Đăng ký làm Supplier",
        path: "/apply/supplier",
        icon: <BusinessIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />,
      });
    }

    return menuItems;
  };

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
        sx={{
          bgcolor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            px: 4,
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Logo */}
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
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  color: "#2d3748",
                  fontSize: "1.75rem",
                  letterSpacing: "-0.025em",
                }}
              >
                EcoFashion
              </Typography>
            </Link>
          </Box>

          {/* Main Navigation */}
          <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#4a5568",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  "&:hover": { color: "#2d3748" },
                }}
              >
                Trang Chủ
              </Typography>
            </Link>

            <Link
              to="/shop"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#4a5568",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  "&:hover": { color: "#2d3748" },
                }}
              >
                Cửa Hàng
              </Typography>
            </Link>

            <Link
              to="/about"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#4a5568",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  "&:hover": { color: "#2d3748" },
                }}
              >
                Về Chúng Tôi
              </Typography>
            </Link>

            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#4a5568",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  "&:hover": { color: "#2d3748" },
                }}
              >
                Liên Hệ
              </Typography>
            </Link>
          </Box>

          {/* Right Side Actions */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {/* Wishlist Icon */}
            <IconButton
              sx={{
                color: "#4a5568",
                "&:hover": {
                  backgroundColor: "rgba(74, 85, 104, 0.1)",
                  color: "#2d3748",
                },
              }}
            >
              <Badge badgeContent={0} color="primary">
                <FavoriteIcon sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>

            {/* Shopping Cart Icon */}
            <IconButton
              sx={{
                color: "#4a5568",
                "&:hover": {
                  backgroundColor: "rgba(74, 85, 104, 0.1)",
                  color: "#2d3748",
                },
              }}
            >
              <Badge badgeContent={3} color="primary">
                <ShoppingCartIcon sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>

            {/* Authentication Section */}
            {!user ? (
              <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    color: "#4a5568",
                    borderColor: "#e2e8f0",
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: 1,
                    px: 3,
                    py: 1,
                    fontSize: "0.875rem",
                    "&:hover": {
                      backgroundColor: "#f7fafc",
                      borderColor: "#cbd5e0",
                      color: "#2d3748",
                    },
                  }}
                >
                  Đăng Nhập
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{
                    backgroundColor: "#2d3748",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: 1,
                    px: 3,
                    py: 1,
                    fontSize: "0.875rem",
                    "&:hover": {
                      backgroundColor: "#1a202c",
                    },
                  }}
                >
                  Đăng Ký
                </Button>
              </Box>
            ) : (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}
              >
                {/* User Name */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#2d3748",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                >
                  Xin chào, {getUserDisplayName()}
                </Typography>

                {/* Menu Button */}
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    color: "#4a5568",
                    padding: "4px",
                    "&:hover": {
                      backgroundColor: "rgba(74, 85, 104, 0.1)",
                    },
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 24 }} />
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
                  sx={{
                    "& .MuiPaper-root": {
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      border: "1px solid #e2e8f0",
                      borderRadius: 2,
                      mt: 1,
                      minWidth: 200,
                    },
                  }}
                >
                  {getMenuItems().map((item, index) => {
                    const isApplicationMenu = item.path.includes("/apply/");
                    const applicationMenuStartIndex = getMenuItems().findIndex(
                      (menuItem) => menuItem.path.includes("/apply/")
                    );

                    return (
                      <div key={index}>
                        {/* Thêm divider trước menu đăng ký */}
                        {isApplicationMenu &&
                          index === applicationMenuStartIndex &&
                          applicationMenuStartIndex > 0 && (
                            <Divider sx={{ my: 1 }} />
                          )}

                        <MenuItem
                          onClick={handleMenuClose}
                          sx={{
                            // Style đặc biệt cho menu đăng ký
                            ...(isApplicationMenu && {
                              backgroundColor: "#f8f9fa",
                              "&:hover": {
                                backgroundColor: "#e9ecef",
                              },
                            }),
                          }}
                        >
                          <Link
                            to={item.path}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            {item.icon}
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: isApplicationMenu ? 600 : 500,
                                fontSize: "0.875rem",
                              }}
                            >
                              {item.label}
                            </Typography>
                          </Link>
                        </MenuItem>
                      </div>
                    );
                  })}

                  {/* Divider trước logout */}
                  <Divider sx={{ my: 1 }} />

                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon
                      sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }}
                    />
                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                      Đăng Xuất
                    </Typography>
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
