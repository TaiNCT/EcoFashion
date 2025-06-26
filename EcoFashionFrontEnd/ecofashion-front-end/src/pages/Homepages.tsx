import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
  Stack,
  Link as MuiLink,
  ListItem,
  List,
  Container,
  IconButton,
  Card,
  Chip,
  CardMedia,
  CardContent,
  Rating,
  Select,
  MenuItem,
  Menu,
  Link,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import banner from "../assets/pictures/banner.jpg";
import post from "../assets/pictures/product-post.png";
import fashion from "../assets/pictures/fashion.png";
import material from "../assets/pictures/material.png";
import information from "../assets/pictures/information.png";
//example
import ao_linen from "../assets/pictures/example/ao-linen.webp";
import chan_vay_dap from "../assets/pictures/example/chan-vay-dap.webp";
import dam_con_trung from "../assets/pictures/example/dam-con-trung.webp";

const products = [
  {
    id: 1,
    title: "Áo Linen",
    author: "Nguyễn Công Trí",
    image: ao_linen, // replace with actual image paths
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 90,
    material: ["Vải Cotton", "Vải Linen"],
  },
  {
    id: 2,
    title: "Chân Váy Đắp",
    author: "Nguyễn Công Trí",
    image: chan_vay_dap,
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 95,
    material: ["Vải Cotton", "Vải Linen", "Vải Sợi"],
  },
  {
    id: 3,
    title: "Đầm Côn Trùng",
    author: "Nguyễn Công Trí",
    image: dam_con_trung,
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 100,
    material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
  },
  {
    id: 4,
    title: "Đầm Côn Trùng",
    author: "Nguyễn Công Trí",
    image: dam_con_trung,
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 100,
    material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
  },
];

export const ArrowForwardIcon = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "30px",
      marginLeft: "5px",
      fill: "rgba(94, 224, 159, 1)",
    }}
  >
    <title />
    <g data-name="Layer 2" id="Layer_2">
      <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
    </g>
  </svg>
);

export const ArrowBackIcon = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "30px",
      marginLeft: "5px",
      fill: "rgba(94, 224, 159, 1)",
      transform: "scaleX(-1)",
    }}
  >
    <title />
    <g data-name="Layer 2" id="Layer_2">
      <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
    </g>
  </svg>
);

export const FavoriteBorderIcon = () => (
  <svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0 -1028.4)">
      <path
        d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
        fill="black"
      />
    </g>
  </svg>
);

export const AddToCart = () => (
  <svg
    height="30"
    viewBox="0 0 48 48"
    width="30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h48v48H0zm36.62 12L31.1 22z" fill="none" />
    <path
      d="M22 18h4v-6h6V8h-6V2h-4v6h-6v4h6v6zm-8 18c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm20 0c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm-19.65-6.5c0-.09.02-.17.06-.24l1.8-3.26h14.9c1.5 0 2.81-.83 3.5-2.06l7.72-14.02L38.83 8h-.01l-2.21 4-5.51 10H17.07l-.26-.54L12.32 12l-1.9-4-1.89-4H2v4h4l7.2 15.17-2.71 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5z"
      fill="white"
    />
  </svg>
);

export const EcoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="32px"
    viewBox="0 0 32 32"
    width="32px"
    className="icon"
    style={{ fill: "rgba(22, 163, 74, 1)" }}
  >
    <g>
      <polyline
        fill="none"
        points="649,137.999 675,137.999 675,155.999 661,155.999"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <polyline
        fill="none"
        points="653,155.999 649,155.999 649,141.999"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <polyline
        fill="none"
        points="661,156 653,162 653,156"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </g>
    <path
      d="M29.7,2.767C29.593,2.317,29.189,2,28.728,2c-0.002,0-0.004,0-0.006,0c-5.267,0.033-18.075,0.916-23.246,8.38  
      c-2.686,3.878-2.917,8.913-0.687,14.965c0.017,0.047,0.052,0.079,0.075,0.122C4.067,27.44,3.758,28.753,3.75,28.79  
      c-0.116,0.54,0.229,1.072,0.769,1.188C4.589,29.993,4.659,30,4.729,30c0.461,0,0.876-0.321,0.977-0.79  
      c0.021-0.102,2.569-10.373,11.577-16.378c0.46-0.306,0.584-0.927,0.277-1.387s-0.927-0.585-1.387-0.277  
      c-5.108,3.405-8.254,8.008-10.104,11.656c-1.324-4.578-0.977-8.377,1.052-11.305c3.993-5.764,13.464-7.154,19.181-7.448  
      C25.072,5.872,23.728,9.174,23.728,15c0,3.12-0.885,5.522-2.629,7.14c-2.796,2.591-7.338,2.834-10.66,2.584  
      c-0.552-0.045-1.031,0.371-1.073,0.922c-0.042,0.55,0.371,1.03,0.921,1.072c0.665,0.051,1.375,0.082,2.113,0.082  
      c3.382,0,7.327-0.663,10.058-3.194c2.17-2.011,3.27-4.906,3.27-8.605c0-9.099,3.43-11.096,3.447-11.105  
      C29.591,3.687,29.809,3.219,29.7,2.767z"
    />
  </svg>
);

const NavLink = styled(MuiLink)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontWeight: 500,
  "&:hover": {
    color: "rgba(94, 224, 159, 1)",
  },
}));

const StyledInput = styled(InputBase)({
  borderRadius: 20,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  flex: 1,
});

export default function Homepage() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Nav Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
          margin: "auto",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      ></AppBar>
      {/* Banner */}
      <Box sx={{ position: "relative" }}>
        <img
          src={banner}
          alt="EcoFashion Banner"
          style={{ width: "100%", height: 580, objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "60%",
              backgroundColor: "rgba(145, 136, 136, 0.42)",
              margin: "auto",
            }}
          >
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Kiến Tạo Phong Cách, Gắn Kết Cộng Đồng, Hướng Tới{" "}
              <span style={{ color: "#32e087" }}>Thời Trang Bền Vững</span>
            </Typography>
          </Box>
          <Typography sx={{ width: "60% ", margin: "auto", fontSize: "25px" }}>
            Cùng Tham Gia Thay Đổi Ngành Thời Trang Với Vật Liệu Tái Chế Và
            Thiết Kế Thân Thiện Với Môi Trường
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "white",
              p: 0.5,
              width: "60%",
              border: "1px solid black",
              margin: "30px auto",
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
          </Box>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                  alignItems: "center",
                  color: "rgba(94, 224, 159, 1)",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Thiết Kế
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "30px",
                    marginLeft: "5px",
                    fill: "rgba(94, 224, 159, 1)",
                  }}
                >
                  <title />
                  <g data-name="Layer 2" id="Layer_2">
                    <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                  </g>
                </svg>
              </Box>
            </Button>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(94, 224, 159, 1)",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Nhà Cung Cấp
                </Typography>

                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "30px",
                    marginLeft: "5px",
                    fill: "rgba(94, 224, 159, 1)",
                  }}
                >
                  <title />
                  <g data-name="Layer 2" id="Layer_2">
                    <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                  </g>
                </svg>
              </Box>
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "0 auto",
                  alignItems: "center",
                  padding: "10px 20px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Cửa Hàng{" "}
                <svg
                  data-name="Layer 1"
                  id="Layer_1"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "30px", marginLeft: "5px", fill: "white" }}
                >
                  <path d="M29.75,10.34A1,1,0,0,0,29,10H23v2h4.88L26.11,27H5.89L4.12,12H9V10H3a1,1,0,0,0-.75.34,1,1,0,0,0-.24.78l2,17A1,1,0,0,0,5,29H27a1,1,0,0,0,1-.88l2-17A1,1,0,0,0,29.75,10.34ZM19,10H13v2h6Z" />
                  <path d="M21,16a1,1,0,0,1-1-1V9a4,4,0,0,0-8,0v6a1,1,0,0,1-2,0V9A6,6,0,0,1,22,9v6A1,1,0,0,1,21,16Z" />
                </svg>
              </Box>
            </Button>
          </Stack>
        </Box>
      </Box>
      {/* Thông Tin Bền Vững */}
      <Box
        sx={{
          backgroundColor: "#f3f3f3",
          padding: "40px 10px",
          backgroundImage: `
          linear-gradient(0deg,
            transparent 24%,
            #e1e1e1 25%,
            #e1e1e1 26%,
            transparent 27%,
            transparent 74%,
            #e1e1e1 75%,
            #e1e1e1 76%,
            transparent 77%,
            transparent
          ),
          linear-gradient(90deg,
            transparent 24%,
            #e1e1e1 25%,
            #e1e1e1 26%,
            transparent 27%,
            transparent 74%,
            #e1e1e1 75%,
            #e1e1e1 76%,
            transparent 77%,
            transparent
          )
        `,
          backgroundSize: "55px 55px",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          sx={{ maxWidth: 1200, margin: "0 auto" }}
        >
          {[
            { quantity: "500", unit: "+", label: "Nhà Thiết Kế" },
            { quantity: "500", unit: "+", label: "Vật Liệu Tái Chế" },
            { quantity: "5000", unit: "+", label: "Sản Phẩm Bền Vững" },
            { quantity: "300", unit: "t", label: "NL Tái Sử Dụng" },
          ].map((item, index) => (
            <Grid key={index} textAlign="center">
              <Typography
                variant="h3"
                component="div"
                sx={{ color: "rgba(52, 168, 83, 1)", fontWeight: "bold" }}
              >
                {item.quantity}
                <Typography
                  component="span"
                  sx={{ fontSize: "2.5rem", marginLeft: "4px" }}
                >
                  {item.unit}
                </Typography>
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", fontSize: "30px", color: "black" }}
              >
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Truy Cập Nhanh  */}
      <Grid sx={{ maxWidth: 1200, margin: "30px auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            margin: "30px auto",
            gap: 5,
          }}
        >
          <Box>
            <Box
              component="img"
              src={post}
              sx={{ width: "100%", height: "60%" }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Cho mọi người thấy sự sáng tạo của bạn
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
              <Button
                variant="text"
                sx={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "rgba(52,168,83,1)",
                  textTransform: "none",
                }}
              >
                Đăng Sản Phẩm{" "}
                <svg
                  viewBox="0 0 32 32"
                  width={30}
                  style={{ fill: "rgba(52,168,83,1)", marginLeft: 8 }}
                >
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </svg>
              </Button>
            </Stack>
          </Box>

          <Box>
            <Box
              component="img"
              src={fashion}
              sx={{ width: "100%", height: "60%" }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Khám phá xu hướng thời trang hiện nay
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
              <Button
                variant="text"
                sx={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "rgba(52,168,83,1)",
                  textTransform: "none",
                }}
              >
                Khám Phá
                <svg
                  viewBox="0 0 32 32"
                  width={30}
                  style={{ fill: "rgba(52,168,83,1)", marginLeft: 8 }}
                >
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </svg>
              </Button>
            </Stack>
          </Box>

          <Box>
            <Box
              component="img"
              src={material}
              sx={{ width: "100%", height: "60%" }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Lựa chọn chất liệu tái chế chất lượng tuyệt vời
            </Typography>
            <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
              <Button
                variant="text"
                sx={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "rgba(52,168,83,1)",
                  textTransform: "none",
                }}
              >
                Mua Bán
                <svg
                  viewBox="0 0 32 32"
                  width={30}
                  style={{ fill: "rgba(52,168,83,1)", marginLeft: 8 }}
                >
                  <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                </svg>
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
      {/* Bán Hàng */}
      <Box
        sx={{
          p: 4,
          background: "#f5f5f5",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Thời Trang Mới */}
        <Box sx={{ borderBottom: "1px solid black", marginBottom: "30px" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ float: "left" }}
          >
            THỜI TRANG MỚI
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "auto",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>

            {products.map((item, index) => (
              <Card
                key={index}
                sx={{ width: "20%", m: 1, position: "relative" }}
              >
                <Box
                  sx={{
                    p: 1,
                    position: "absolute",
                    top: 8,
                    left: 8,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Chip
                    label="New"
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Chip
                    icon={<EcoIcon />}
                    label={`${item.recycledPercentage}% Tái Chế`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(200, 248, 217, 1)",
                      color: "rgba(22, 103, 86, 1)",
                      fontSize: "15px",
                    }}
                  />
                </Box>

                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    backgroundColor: "white",
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>

                <Link
                  href={`/detail/${item.id}`}
                  style={{ justifyContent: "center" }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.image}
                    alt={item.title}
                  />
                </Link>

                <CardContent
                  sx={{
                    textAlign: "left",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontSize: "30px",
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    Bởi {item.author}
                  </Typography>

                  <Box display="flex" alignItems="center" mt={1}>
                    <Rating value={item.rating} readOnly size="small" />
                    <Typography variant="body2" ml={1}>
                      ({item.rating})
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.material.map((mat, index) => (
                      <Chip
                        key={index}
                        label={mat}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(220, 252, 231, 1)",
                          color: "rgba(29, 106, 58, 1)",
                        }}
                      />
                    ))}
                  </Box>

                  <Typography fontWeight="bold" mt={1}>
                    {item.price}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      backgroundColor: "rgba(22, 163, 74, 1)",
                    }}
                  >
                    <AddToCart />
                    Thêm vào Cart
                  </Button>
                </CardContent>
              </Card>
            ))}

            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          <Typography
            sx={{
              color: "green",
              mt: 3,
              cursor: "pointer",
              fontWeight: 600,
              width: "100%",
              textDecoration: "underline",
              margin: "30px auto",
            }}
          >
            XEM THÊM SẢN PHẨM
          </Typography>
        </Box>
        {/* Bán Chạy Nhất */}
        <Box sx={{ borderBottom: "1px solid black", marginBottom: "30px" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ float: "left" }}
          >
            BÁN CHẠY NHẤT
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "auto",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>

            {products.map((item, index) => (
              <Card
                key={index}
                sx={{ width: "20%", m: 1, position: "relative" }}
              >
                <Box
                  sx={{
                    p: 1,
                    position: "absolute",
                    top: 8,
                    left: 8,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Chip
                    label="Bán Chạy Nhất"
                    size="small"
                    sx={{
                      mb: 1,
                      backgroundColor: "rgba(245, 144, 56, 1)",
                      color: "white",
                    }}
                  />
                  <Chip
                    icon={<EcoIcon />}
                    label={`${item.recycledPercentage}% Tái Chế`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(200, 248, 217, 1)",
                      color: "rgba(22, 103, 86, 1)",
                      fontSize: "15px",
                    }}
                  />
                </Box>

                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    backgroundColor: "white",
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>

                <Link
                  href={`/detail/${item.id}`}
                  style={{ justifyContent: "center" }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.image}
                    alt={item.title}
                  />
                </Link>

                <CardContent
                  sx={{
                    textAlign: "left",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontSize: "30px",
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    Bởi {item.author}
                  </Typography>

                  <Box display="flex" alignItems="center" mt={1}>
                    <Rating value={item.rating} readOnly size="small" />
                    <Typography variant="body2" ml={1}>
                      ({item.rating})
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.material.map((mat, index) => (
                      <Chip
                        key={index}
                        label={mat}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(220, 252, 231, 1)",
                          color: "rgba(29, 106, 58, 1)",
                        }}
                      />
                    ))}
                  </Box>

                  <Typography fontWeight="bold" mt={1}>
                    {item.price}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      backgroundColor: "rgba(22, 163, 74, 1)",
                    }}
                  >
                    <AddToCart />
                    Thêm vào Cart
                  </Button>
                </CardContent>
              </Card>
            ))}

            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          <Typography
            sx={{
              color: "green",
              mt: 3,
              cursor: "pointer",
              fontWeight: 600,
              width: "100%",
              textDecoration: "underline",
              margin: "30px auto",
            }}
          >
            XEM THÊM SẢN PHẨM
          </Typography>
        </Box>

        {/* Nguyên Vật Liệu */}
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ float: "left" }}
          >
            NGUYÊN LIỆU
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "auto",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>

            {products.map((item, index) => (
              <Card
                key={index}
                sx={{ width: "20%", m: 1, position: "relative" }}
              >
                <Box
                  sx={{
                    p: 1,
                    position: "absolute",
                    top: 8,
                    left: 8,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Chip
                    label="New"
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Chip
                    icon={<EcoIcon />}
                    label={`${item.recycledPercentage}% Tái Chế`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(200, 248, 217, 1)",
                      color: "rgba(22, 103, 86, 1)",
                      fontSize: "15px",
                    }}
                  />
                </Box>

                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    backgroundColor: "white",
                  }}
                >
                  <FavoriteBorderIcon />
                </IconButton>

                <Link
                  href={`/detail/${item.id}`}
                  style={{ justifyContent: "center" }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.image}
                    alt={item.title}
                  />
                </Link>

                <CardContent
                  sx={{
                    textAlign: "left",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontSize: "30px",
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    Bởi {item.author}
                  </Typography>

                  <Box display="flex" alignItems="center" mt={1}>
                    <Rating value={item.rating} readOnly size="small" />
                    <Typography variant="body2" ml={1}>
                      ({item.rating})
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.material.map((mat, index) => (
                      <Chip
                        key={index}
                        label={mat}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(220, 252, 231, 1)",
                          color: "rgba(29, 106, 58, 1)",
                        }}
                      />
                    ))}
                  </Box>

                  <Typography fontWeight="bold" mt={1}>
                    {item.price} /m
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      backgroundColor: "rgba(22, 163, 74, 1)",
                    }}
                  >
                    <AddToCart />
                    Thêm vào Cart
                  </Button>
                </CardContent>
              </Card>
            ))}

            <IconButton>
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          <Typography
            sx={{
              color: "green",
              mt: 3,
              cursor: "pointer",
              fontWeight: 600,
              width: "100%",
              textDecoration: "underline",
              margin: "30px auto",
            }}
          >
            XEM THÊM SẢN PHẨM
          </Typography>
        </Box>
      </Box>
      {/* Thông Tin Chi Tiết */}
      <Box sx={{ bgcolor: "#fff", py: 6, px: 4, display: "flex" }}>
        {/* Text Section */}
        <Grid>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Hướng tới Thời trang Bền vững
          </Typography>
          <Typography>
            Ngành thời trang là một trong những ngành gây ô nhiễm lớn nhất trên
            toàn cầu. Tại EcoFashion, chúng tôi đang thay đổi điều đó bằng cách
            thúc đẩy các nguyên tắc kinh tế tuần hoàn và thực hành bền vững.
          </Typography>

          <List sx={{ mt: 3 }}>
            {/* Item 1 */}
            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
              <EcoIcon />
              <Box>
                <Typography fontWeight="bold">Giảm Thiểu Rác Thải</Typography>
                <Typography>
                  Nền tảng của chúng tôi đã góp phần chuyển hướng hơn 5 tấn rác
                  thải dệt may khỏi bãi chôn lấp.
                </Typography>
              </Box>
            </ListItem>

            {/* Item 2 */}
            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
              <EcoIcon />
              <Box>
                <Typography fontWeight="bold">Bảo Tồn Nguồn Nước</Typography>
                <Typography>
                  Các sản phẩm trên nền tảng của chúng tôi sử dụng ít hơn 70%
                  lượng nước so với thời trang thông thường.
                </Typography>
              </Box>
            </ListItem>

            {/* Item 3 */}
            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
              <EcoIcon />
              <Box>
                <Typography fontWeight="bold">Giảm Dấu Chân Carbon</Typography>
                <Typography>
                  Việc tối ưu hóa chuỗi cung ứng của chúng tôi giúp giảm lượng
                  khí thải carbon lên đến 60%.
                </Typography>
              </Box>
            </ListItem>
          </List>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#00a651",
              "&:hover": { bgcolor: "#008b45" },
            }}
          >
            Tìm hiểu thêm ➞
          </Button>
        </Grid>

        {/* Image Section */}
        <Grid display="flex" justifyContent="center">
          <Box
            component="img"
            src={information}
            alt="Sustainable Fashion"
            sx={{ maxWidth: "80%", height: "auto" }}
          />
        </Grid>
      </Box>
      {/* About Us */}
      <Box
        sx={{
          backgroundColor: "rgba(18, 96, 77, 1)",
          textAlign: "center",
          py: 5,
        }}
      >
        <Container>
          <Typography variant="h4" sx={{ color: "white", mb: 2 }}>
            Tham Gia Vào EcoFashion
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontSize: "20px",
              width: "80%",
              mx: "auto",
              mb: 3,
            }}
          >
            Dù bạn là nhà thiết kế, nhà cung cấp hay người có ý thức về Bảo Vệ
            Môi trường, cộng đồng của chúng tôi luôn có chỗ dành cho bạn.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "rgba(52, 168, 83, 1)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                fontWeight: "bold",
              }}
            >
              Đăng Ký
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "#ddd",
                },
              }}
            >
              Về Chúng Tôi
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
