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
import { useNavigate } from "react-router-dom";
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

import React from "react";
//example
import profile_picture from "../assets/pictures/example/profile_picture.jpg";

// const StyledInput = styled(InputBase)({
//   borderRadius: 20,
//   backgroundColor: "#fff",
//   border: "1px solid #ccc",
//   flex: 1,
// });

export default function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const openShop = Boolean(anchorE2);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickShop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseShop = () => {
    setAnchorE2(null);
  };

  const handleGoToDesignerPage = () => {
    handleClose();
    navigate("/designerregister"); // <-- Update to your actual route
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

  return (
    <AppBar position="sticky" sx={{ bgcolor: "white", boxShadow: "none" }}>
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
          <NavLink href="#home" sx={{ margin: "auto" }}>
            TRANG CHỦ
          </NavLink>
          {/* <Link href="#shop">
              <Select
                sx={{
                  border: "none",
                  fontSize: 14,
                  minWidth: 100,
                  "& fieldset": { border: "none" },
                }}
              >
                <MenuItem value="products">Thời trang</MenuItem>
                <MenuItem value="material">Vật liệu</MenuItem>
              </Select>
            </Link> */}

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
              color: "black",
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
          <NavLink href="#contact" sx={{ margin: "auto" }}>
            THÔNG TIN
          </NavLink>
          <NavLink href="#about" sx={{ margin: "auto" }}>
            VỀ CHÚNG TÔI
          </NavLink>
          <NavLink href="#contact" sx={{ margin: "auto" }}>
            LIÊN LẠC
          </NavLink>
        </Box>
        {/* Search Bar */}
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "white",
            p: 0.5,
            borderRadius: "20px",
            width: "60%",
            border: "1px solid black",
          }}
        >
          <Box
            sx={{
              borderRight: "1px solid black",
              height: "100%",
            }}
          >
            <Select
              defaultValue="all"
              sx={{
                border: "none",
                fontSize: 14,
                minWidth: 100,
                "& fieldset": { border: "none" },
              }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="products">Thời trang</MenuItem>
              <MenuItem value="material">Vật liệu</MenuItem>
            </Select>
          </Box>

          <StyledInput
            placeholder="Tìm kiếm.."
            fullWidth
            sx={{ border: "none" }}
          />
        </Box> */}

        {/* Cart and Auth */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginLeft: "auto",
          }}
        >
          <IconButton sx={{ color: "#3e4b3b" }}>
            <ShoppingCartIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <Box sx={{ display: "flex" }}>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "#3e4b3b" }}
            >
              {/* <AccountCircleIcon sx={{ fontSize: 30 }} /> */}
              <img
                src={profile_picture}
                style={{ height: "60px", width: "60px", borderRadius: "50px" }}
              />
            </IconButton>
            <Typography sx={{ color: "black", margin: "auto" }}>
              Nguyễn Công Trí
            </Typography>
          </Box>
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
            {/* <MenuItem onClick={handleClose}>
              <Box sx={{ display: "flex" }}>
                <Icon>
                  <LoginIcon />
                </Icon>
                <Typography sx={{ padding: "3px" }}>Đăng Nhập</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box sx={{ display: "flex" }}>
                <Icon>
                  <HowToRegIcon />
                </Icon>
                <Typography sx={{ padding: "3px" }}>Đăng Ký</Typography>
              </Box> 
            </MenuItem>*/}
            <MenuItem onClick={handleGoToDesignerPage}>
              <Box sx={{ display: "flex" }}>
                <Icon>
                  <DesignServicesIcon />
                </Icon>
                <Typography sx={{ padding: "3px" }}>
                  Trở Thành Nhà Thiết Kế
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box sx={{ display: "flex", borderBottom: "1px solid black" }}>
                <Icon>
                  <CompostIcon />
                </Icon>
                <Typography sx={{ padding: "3px" }}>
                  Trở Thành Nhà Cung Cấp
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Icon>
                  <SettingsIcon />
                </Icon>
                <Typography sx={{ padding: "3px" }}>Cài Đặt</Typography>
              </Box>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Icon>
                  <LogoutIcon />
                </Icon>
                <Typography sx={{ padding: "3px" }}> Đăng Xuất</Typography>
              </Box>
            </MenuItem>
          </Menu>
          {/* <Box
            sx={{
              border: "1px solid rgba(94, 224, 159, 1)",
              borderRadius: "30px",
              display: "flex",
              width: "100%",
              height: "50px",
            }}
          >
            <Button
              sx={{
                color: "rgba(94, 224, 159, 1)",
                border: "none",
                flex: 1,
                "&:active": {
                  backgroundColor: "rgba(94, 224, 159, 1)",
                  color: "white",
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                },
              }}
            >
              Đăng Ký
            </Button>
            <Box
              sx={{
                width: "1px",
                backgroundColor: "rgba(94, 224, 159, 1)",
                height: "100%",
                alignSelf: "center",
              }}
            />
            <Button
              sx={{
                color: "rgba(94, 224, 159, 1)",
                border: "none",
                flex: 1,
                whiteSpace: "nowrap",
              }}
            >
              Đăng Nhập
            </Button>
          </Box> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
