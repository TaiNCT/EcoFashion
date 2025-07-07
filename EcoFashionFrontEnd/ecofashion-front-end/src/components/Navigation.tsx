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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/pictures/logo.png";
//Icon Login
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import LogoutIcon from "@mui/icons-material/Logout";
import CompostIcon from "@mui/icons-material/Compost";
import SettingsIcon from "@mui/icons-material/Settings";
//Icon Register
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import React, { useEffect, useState } from "react";
//example
import profile_picture from "../assets/pictures/example/profile_picture.jpg";
import { UserAuth } from "../services/AuthContext";

// const StyledInput = styled(InputBase)({
//   borderRadius: 20,
//   backgroundColor: "#fff",
//   border: "1px solid #ccc",
//   flex: 1,
// });

export default function Navigation() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const openShop = Boolean(anchorE2);
  const handleClickShop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE2(event.currentTarget);
  };
  const handleCloseShop = () => {
    setAnchorE2(null);
  };

  const handleAuth = (type: any) => {
    handleClose();
    switch (type) {
      case "register":
        navigate("/register");
        break;
      case "login":
        navigate("/login");
        break;
      case "designerregister":
        navigate("/designer/register");
        break;
      case "desiger-profile":
        navigate("/designer/profile");
        break;
      case "desiger-dashboard":
        navigate("/designer/dashboard");
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

  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      handleClose(); // Close the menu
      navigate("/"); // Optional: Redirect to homepage or login
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
  return (
    <AppBar
      position="fixed"
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
            <img src={logo} alt="EcoFashion Logo" style={{ height: 80 }} />
          </Button>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-evenly",
            maxWidth: "100%", // optional: limit width
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
          >
            <MenuItem onClick={handleClose}>Thời Trang</MenuItem>
            <MenuItem onClick={handleClose}>Vật Liệu</MenuItem>
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
          <Box sx={{ display: "flex" }}>
            {user != null ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ color: "#3e4b3b" }}
                >
                  <img
                    src={profile_picture}
                    alt="User avatar"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </IconButton>
                <Typography
                  sx={{ color: scrolled || !isHome ? "black" : "white" }}
                >
                  {user.fullName}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ color: "#3e4b3b" }}
                >
                  <AccountCircleIcon
                    sx={{
                      fontSize: 30,
                      color: scrolled || !isHome ? "black" : "white",
                    }}
                  />
                </IconButton>
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
              <MenuItem onClick={() => handleAuth("register")}>
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
              {/* <MenuItem onClick={() => handleAuth("designerregister")}> */}
              <MenuItem onClick={() => handleAuth("desiger-profile")}>
                <Box sx={{ display: "flex" }}>
                  <Icon>
                    <DesignServicesIcon />
                  </Icon>
                  <Typography sx={{ padding: "3px" }}>Trang Cá Nhân</Typography>
                </Box>
              </MenuItem>
              {user.roleId === 1 ? (
                <MenuItem>
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <CompostIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Admin DashBoard
                    </Typography>
                  </Box>
                </MenuItem>
              ) : user.roleId === 2 ? (
                <MenuItem onClick={() => handleAuth("desiger-dashboard")}>
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <CompostIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Designer DashBoard
                    </Typography>
                  </Box>
                </MenuItem>
              ) : user.roleId === 3 ? (
                <MenuItem>
                  <Box
                    sx={{ display: "flex", borderBottom: "1px solid black" }}
                  >
                    <Icon>
                      <CompostIcon />
                    </Icon>
                    <Typography sx={{ padding: "3px" }}>
                      Supplier DashBoard
                    </Typography>
                  </Box>
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => handleAuth("designerregister")}>
                    <Box
                      sx={{ display: "flex", borderBottom: "1px solid black" }}
                    >
                      <Icon>
                        <CompostIcon />
                      </Icon>
                      <Typography sx={{ padding: "3px" }}>
                        Đăng Kí Làm Nhà Thiết Kế
                      </Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={() => handleAuth("designerregister")}>
                    <Box
                      sx={{ display: "flex", borderBottom: "1px solid black" }}
                    >
                      <Icon>
                        <CompostIcon />
                      </Icon>
                      <Typography sx={{ padding: "3px" }}>
                        Đăng Kí Làm Nhà Cung Cấp
                      </Typography>
                    </Box>
                  </MenuItem>
                </>
              )}

              <MenuItem onClick={handleClose}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Icon>
                    <SettingsIcon />
                  </Icon>
                  <Typography sx={{ padding: "3px" }}>Cài Đặt</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Icon>
                    <LogoutIcon />
                  </Icon>
                  <Typography sx={{ padding: "3px" }}> Đăng Xuất</Typography>
                </Box>
              </MenuItem>
            </Menu>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
