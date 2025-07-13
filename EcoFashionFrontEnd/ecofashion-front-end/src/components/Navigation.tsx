import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
  Divider,
} from "@mui/material";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
//Image
import logo from "../assets/pictures/homepage/logo.png";
//Icon Login
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
//Icon Register
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FeedIcon from "@mui/icons-material/Feed";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CompostIcon from "@mui/icons-material/Compost";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useAuth } from "../services/user/AuthContext";
import { toast } from "react-toastify";

export default function Navigation() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    // Remove automatic refresh to prevent logout issues
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);
  const openShop = Boolean(anchorE2);
  const handleClickShop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloseShop = () => {
    setAnchorE2(null);
  };

  const [anchorE3, setAnchorE3] = useState<null | HTMLElement>(null);
  const openExplore = Boolean(anchorE3);
  const handleClickExplore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE3(event.currentTarget);
  };
  const handleCloseExplore = () => {
    setAnchorE3(null);
  };

  const handleAuth = (type: any) => {
    handleClose();

    // Get current user role for profile navigation
    const userRole = user?.role?.toLowerCase();

    switch (type) {
      case "signup":
        navigate("/signup");
        break;
      case "login":
        navigate("/login");
        break;
      case "designerregister":
        navigate("/apply/designer");
        break;
      case "supplierregister":
        navigate("/apply/supplier");
        break;
      case "desiger-profile":
        // Navigate based on user role
        if (userRole === "designer") {
          navigate("/designer/profile");
        } else if (userRole === "supplier") {
          navigate("/supplier/profile");
        } else if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/profile"); // Customer profile
        }
        break;
      case "desiger-dashboard":
        navigate("/designer/dashboard");
        break;
      case "admin-dashboard":
        navigate("/admin/dashboard");
        break;
      case "admin-applications":
        navigate("/admin/applications");
        break;
      case "supplier-profile":
        navigate("/supplier/profile");
        break;
      case "my-applications":
        navigate("/my-applications");
        break;
      case "explore-designers":
        navigate("/explore/designers");
        break;
      case "explore-suppliers":
        navigate("/explore/suppliers");
        break;
    }
  };

  const NavLink = styled(MuiLink)(({ theme }) => ({
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    textDecoration: "none",
    fontWeight: 500,
    "&:hover": {
      color: "rgba(94, 224, 159, 1)",
    },
  }));

  const { user, logout, refreshUserFromServer } = useAuth();

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
    handleClose();
  };

  const location = useLocation();
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

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
          },
          {
            label: "Bảng Điều Khiển",
            path: "/designer/dashboard",
            icon: (
              <DashboardIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
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
        icon: <FeedIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />,
      });
    }

    // Thêm menu "Đăng ký tham gia" cho user chưa có role Designer/Supplier
    if (role !== "designer" && role !== "admin" && role !== "supplier") {
      menuItems.push({
        label: "Đăng ký làm Nhà Thiết Kế",
        path: "/apply/designer",
        icon: (
          <DesignServicesIcon
            sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }}
          />
        ),
      });
    }

    if (role !== "supplier" && role !== "admin" && role !== "designer") {
      menuItems.push({
        label: "Đăng ký làm Nhà Cung Cấp",
        path: "/apply/supplier",
        icon: (
          <HandshakeIcon sx={{ mr: 1.5, fontSize: 20, color: "#4a5568" }} />
        ),
      });
    }

    return menuItems;
  };
  // Hide Nav static on these routes
  const staticLayout = matchPath("/brand/:id", location.pathname);
  return (
    <AppBar
      position={staticLayout ? "static" : "sticky"}
      elevation={scrolled || !isHome ? 4 : 0}
      sx={{
        backgroundColor: scrolled || !isHome ? "#fff" : "transparent",
        color: scrolled || !isHome ? "white" : "black",
        transition: "0.3s",
        paddingLeft: 3,
        paddingRight: 3,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button href="/">
            <img src={logo} alt="EcoFashion Logo" style={{ height: 60 }} />
          </Button>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-evenly",
            maxWidth: "70%", // optional: limit width
          }}
        >
          <NavLink
            href="/"
            sx={{
              margin: "auto",
              color: scrolled || !isHome ? "black" : "white",
            }}
          >
            TRANG CHỦ
          </NavLink>
          <Button
            id="basic-button"
            aria-controls={openShop ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openShop ? "true" : undefined}
            onClick={handleClickShop}
            disableRipple // xoá hiệu ứng ripple
            disableElevation // xoá đổ bóng nếu có
            sx={{
              margin: "auto",
              textDecoration: "none",
              color: scrolled || !isHome ? "black" : "white",
              background: "transparent",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "transparent", // xoá màu nền khi hover
                color: "rgba(94, 224, 159, 1)",
              },
              "&:focus": {
                outline: "none", // xoá viền khi focus
                backgroundColor: "transparent",
              },
              "&:active": {
                backgroundColor: "transparent", // xoá hiệu ứng khi click
                boxShadow: "none",
              },
            }}
          >
            Cửa Hàng
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorE2}
            open={openShop}
            onClose={handleCloseShop}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
            disableScrollLock
          >
            <MenuItem onClick={handleCloseShop}>Thời Trang</MenuItem>
            <MenuItem onClick={handleCloseShop}>Vật Liệu</MenuItem>
          </Menu>

          <Button
            id="explore-button"
            aria-controls={openExplore ? "explore-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openExplore ? "true" : undefined}
            onClick={handleClickExplore}
            disableRipple
            disableElevation
            sx={{
              margin: "auto",
              textDecoration: "none",
              color: scrolled || !isHome ? "black" : "white",
              background: "transparent",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: "rgba(94, 224, 159, 1)",
              },
              "&:focus": {
                outline: "none",
                backgroundColor: "transparent",
              },
              "&:active": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            Khám Phá
          </Button>
          <Menu
            id="explore-menu"
            anchorEl={anchorE3}
            open={openExplore}
            onClose={handleCloseExplore}
            slotProps={{
              list: {
                "aria-labelledby": "explore-button",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseExplore();
                handleAuth("explore-designers");
              }}
            >
              Nhà Thiết Kế
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseExplore();
                handleAuth("explore-suppliers");
              }}
            >
              Nhà Cung Cấp
            </MenuItem>
          </Menu>
          <NavLink
            href="/businessinfor"
            sx={{
              margin: "auto",
              color: scrolled || !isHome ? "black" : "white",
            }}
          >
            THÔNG TIN KINH DOANH
          </NavLink>
          <NavLink
            href="/about"
            sx={{
              margin: "auto",
              color: scrolled || !isHome ? "black" : "white",
            }}
          >
            VỀ CHÚNG TÔI
          </NavLink>
          <NavLink
            href="/contact"
            sx={{
              margin: "auto",
              color: scrolled || !isHome ? "black" : "white",
            }}
          >
            LIÊN LẠC
          </NavLink>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginLeft: "auto",
          }}
        >
          <IconButton sx={{ color: "#3e4b3b" }}>
            <ShoppingCartIcon
              sx={{
                fontSize: 30,
                color: scrolled || !isHome ? "black" : "white",
              }}
            />
          </IconButton>
          <IconButton sx={{ color: "#3e4b3b" }}>
            <FavoriteIcon
              sx={{
                fontSize: 30,
                color: scrolled || !isHome ? "black" : "white",
              }}
            />
          </IconButton>
          <Box sx={{ display: "flex" }}>
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ color: "#3e4b3b" }}
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="User Avatar"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: "#4caf50",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {user.fullName
                        ? user.fullName.charAt(0).toUpperCase()
                        : user.email
                        ? user.email.charAt(0).toUpperCase()
                        : "U"}
                    </Box>
                  )}
                </IconButton>
                <Typography
                  sx={{
                    color: scrolled || !isHome ? "black" : "white",
                    fontWeight: 500,
                  }}
                >
                  {user.fullName || user.email}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    color: scrolled || !isHome ? "black" : "white",
                    border: 1,
                    borderColor: scrolled || !isHome ? "black" : "white",
                    "&:hover": {
                      backgroundColor: "rgba(94, 224, 159, 0.1)",
                      borderColor: "rgba(94, 224, 159, 1)",
                      color: "rgba(94, 224, 159, 1)",
                    },
                  }}
                >
                  Đăng Nhập
                </Button>
              </Box>
            )}
          </Box>

          {!user ? (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={() => handleAuth("login")}>
                <Box sx={{ display: "flex" }}>
                  <Icon>
                    <LoginIcon />
                  </Icon>
                  <Typography sx={{ padding: "3px" }}>Đăng Nhập</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={() => handleAuth("signup")}>
                <Box sx={{ display: "flex" }}>
                  <Icon>
                    <HowToRegIcon />
                  </Icon>
                  <Typography sx={{ padding: "3px" }}>Đăng Ký</Typography>
                </Box>
              </MenuItem>
            </Menu>
          ) : (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
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
                  minWidth: 100,
                },
              }}
            >
              {/* User Profile Link */}
              <MenuItem onClick={() => handleAuth("desiger-profile")}>
                <Box sx={{ display: "flex" }}>
                  <Icon>
                    <DesignServicesIcon />
                  </Icon>
                  <Typography sx={{ padding: "3px" }}>Trang Cá Nhân</Typography>
                </Box>
              </MenuItem>

              {/* Role-specific Menu Items */}
              {user.role?.toLowerCase() === "admin" && [
                <MenuItem
                  key="admin-dashboard"
                  onClick={() => handleAuth("admin-dashboard")}
                >
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <CompostIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Quản Trị Hệ Thống
                    </Typography>
                  </Box>
                </MenuItem>,
                <MenuItem
                  key="admin-applications"
                  onClick={() => handleAuth("admin-applications")}
                >
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <AssignmentIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Quản Lý Đơn Đăng Ký
                    </Typography>
                  </Box>
                </MenuItem>,
              ]}

              {user.role?.toLowerCase() === "designer" && (
                <MenuItem onClick={() => handleAuth("desiger-dashboard")}>
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <CompostIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Designer Dashboard
                    </Typography>
                  </Box>
                </MenuItem>
              )}

              {user.role?.toLowerCase() === "supplier" && (
                <MenuItem onClick={() => handleAuth("supplier-profile")}>
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <CompostIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Supplier Dashboard
                    </Typography>
                  </Box>
                </MenuItem>
              )}

              {/* Show application menus for customers/users who can still apply */}
              {(user.role?.toLowerCase() === "customer" ||
                user.role?.toLowerCase() === "user") && [
                <MenuItem
                  key="apply-designer"
                  onClick={() => handleAuth("designerregister")}
                >
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <CompostIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Đăng Ký Làm Nhà Thiết Kế
                    </Typography>
                  </Box>
                </MenuItem>,
                <MenuItem
                  key="apply-supplier"
                  onClick={() => handleAuth("supplierregister")}
                >
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <CompostIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Đăng Ký Làm Nhà Cung Cấp
                    </Typography>
                  </Box>
                </MenuItem>,
              ]}

              {/* Show "My Applications" for users who might have pending applications */}
              {(user.role?.toLowerCase() === "customer" ||
                user.role?.toLowerCase() === "user" ||
                user.role?.toLowerCase() === "designer" ||
                user.role?.toLowerCase() === "supplier") && (
                <MenuItem onClick={() => handleAuth("my-applications")}>
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <DesignServicesIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Đơn Đăng Ký Của Tôi
                    </Typography>
                  </Box>
                </MenuItem>
              )}

              {/* Common Menu Items */}
              <MenuItem onClick={handleClose}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Icon>
                    <SettingsIcon />
                  </Icon>
                  <Typography sx={{ padding: "3px" }}>Cài Đặt</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Icon>
                    <LogoutIcon />
                  </Icon>
                  <Typography sx={{ padding: "3px" }}> Đăng Xuất</Typography>
                </Box>
              </MenuItem>
            </Menu>
            // <Menu
            //   id="basic-menu"
            //   anchorEl={anchorEl}
            //   open={open}
            //   onClose={handleClose}
            //   slotProps={{
            //     list: {
            //       "aria-labelledby": "basic-button",
            //     },
            //   }}
            // >
            //   {/* <MenuItem onClick={() => handleAuth("designerregister")}> */}
            //   <MenuItem onClick={() => handleAuth("desiger-profile")}>
            //     <Box sx={{ display: "flex" }}>
            //       <Icon>
            //         <DesignServicesIcon />
            //       </Icon>
            //       <Typography sx={{ padding: "3px" }}>Trang Cá Nhân</Typography>
            //     </Box>
            //   </MenuItem>
            //   {user.roleId === 1 ? (
            //     <MenuItem>
            //       <Box
            //         sx={{ display: "flex", borderBottom: "1px solid black" }}
            //       >
            //         <Icon>
            //           <CompostIcon />
            //         </Icon>
            //         <Typography sx={{ padding: "3px" }}>
            //           Admin DashBoard
            //         </Typography>
            //       </Box>
            //     </MenuItem>
            //   ) : user.roleId === 2 ? (
            //     <MenuItem onClick={() => handleAuth("desiger-dashboard")}>
            //       <Box
            //         sx={{ display: "flex", borderBottom: "1px solid black" }}
            //       >
            //         <Icon>
            //           <CompostIcon />
            //         </Icon>
            //         <Typography sx={{ padding: "3px" }}>
            //           Designer DashBoard
            //         </Typography>
            //       </Box>
            //     </MenuItem>
            //   ) : user.roleId === 3 ? (
            //     <MenuItem>
            //       <Box
            //         sx={{ display: "flex", borderBottom: "1px solid black" }}
            //       >
            //         <Icon>
            //           <CompostIcon />
            //         </Icon>
            //         <Typography sx={{ padding: "3px" }}>
            //           Supplier DashBoard
            //         </Typography>
            //       </Box>
            //     </MenuItem>
            //   ) : (
            //     <>
            //       <MenuItem onClick={() => handleAuth("designerregister")}>
            //         <Box
            //           sx={{ display: "flex", borderBottom: "1px solid black" }}
            //         >
            //           <Icon>
            //             <CompostIcon />
            //           </Icon>
            //           <Typography sx={{ padding: "3px" }}>
            //             Đăng Kí Làm Nhà Thiết Kế
            //           </Typography>
            //         </Box>
            //       </MenuItem>
            //       <MenuItem onClick={() => handleAuth("designerregister")}>
            //         <Box
            //           sx={{ display: "flex", borderBottom: "1px solid black" }}
            //         >
            //           <Icon>
            //             <CompostIcon />
            //           </Icon>
            //           <Typography sx={{ padding: "3px" }}>
            //             Đăng Kí Làm Nhà Cung Cấp
            //           </Typography>
            //         </Box>
            //       </MenuItem>
            //     </>
            //   )}

            //   <MenuItem onClick={handleClose}>
            //     <Box sx={{ display: "flex", width: "100%" }}>
            //       <Icon>
            //         <SettingsIcon />
            //       </Icon>
            //       <Typography sx={{ padding: "3px" }}>Cài Đặt</Typography>
            //     </Box>
            //   </MenuItem>
            //   <MenuItem onClick={handleLogout}>
            //     <Box sx={{ display: "flex", width: "100%" }}>
            //       <Icon>
            //         <LogoutIcon />
            //       </Icon>
            //       <Typography sx={{ padding: "3px" }}> Đăng Xuất</Typography>
            //     </Box>
            //   </MenuItem>
            // </Menu>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
