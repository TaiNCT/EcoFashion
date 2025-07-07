import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import ao_linen from "../assets/pictures/example/ao-linen.webp";
import chan_vay_dap from "../assets/pictures/example/chan-vay-dap.webp";
import dam_con_trung from "../assets/pictures/example/dam-con-trung.webp";
import {
  AddToCart,
  ArrowBackIcon,
  ArrowForwardIcon,
} from "../assets/icons/icon";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
// Icon
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { EcoIcon } from "../assets/icons/icon";
//Certificate
import GRS from "../assets/pictures/certificate/global-recycled-standard-(grs).webp";
import OEKO from "../assets/pictures/certificate/image-removebg-preview-70.png";

//example
import Banner from "../assets/pictures/detail.jpg";

const products = [
  {
    id: "1",
    title: "Áo Linen",
    author: "Nguyễn Công Trí",
    image: ao_linen, // replace with actual image paths\
    images: [ao_linen, dam_con_trung, chan_vay_dap],
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 90,
    material: [
      { materialName: "Vải Cotton", percentage: 20 },
      { materialName: "Vải Linen", percentage: 70 },
      { materialName: "Vải Sợi", percentage: 5 },
      { materialName: "Vải Nilom", percentage: 5 },
    ],
  },
  {
    id: "2",
    title: "Chân Váy Đắp",
    author: "Nguyễn Công Trí",
    image: chan_vay_dap,
    images: [chan_vay_dap, dam_con_trung, ao_linen],
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 95,
    material: [
      { materialName: "Vải Cotton", percentage: 30 },
      { materialName: "Vải Linen", percentage: 70 },
    ],
  },
  {
    id: "3",
    title: "Đầm Côn Trùng",
    author: "Nguyễn Công Trí",
    image: dam_con_trung,
    images: [dam_con_trung, chan_vay_dap, ao_linen],
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 100,
    material: [
      { materialName: "Vải Cotton", percentage: 30 },
      { materialName: "Vải Linen", percentage: 70 },
    ],
  },
  {
    id: "4",
    title: "Đầm Côn Trùng",
    author: "Nguyễn Công Trí",
    image: dam_con_trung,
    images: [dam_con_trung, dam_con_trung, dam_con_trung, ao_linen],
    price: "1.900.000₫",
    rating: 4,
    recycledPercentage: 100,
    material: [
      { materialName: "Vải Cotton", percentage: 30 },
      { materialName: "Vải Linen", percentage: 70 },
    ],
  },
];

const reviews = [
  {
    name: "Sarah M.",
    date: "May 10, 2025",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    name: "Michael T.",
    date: "April 28, 2025",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    name: "Jessica L.",
    date: "April 15, 2025",
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  // Add more reviews as needed
];

const ratingData = [
  { star: 5, value: 85 },
  { star: 4, value: 10 },
  { star: 3, value: 3 },
  { star: 2, value: 1 },
  { star: 1, value: 1 },
];

export default function FashionDetail() {
  const { id } = useParams(); // lấy id từ URL
  const product = products.find((p) => p.id === id);
  // const [mainImage, setMainImage] = useState(
  //   products.find((p) => p.id === id)?.image
  // );

  if (!product) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Không tìm thấy sản phẩm.</Typography>
      </Box>
    );
  }

  const [size, setSize] = useState("M");

  //Change Image
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  //Change Tab
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const materialColors = [
    "success.main",
    "error.main",
    "primary.main",
    "warning.main",
    "info.main",
    "secondary.main",
  ];

  return (
    <Box
      sx={{
        mx: "auto",
        width: "100%",
        backgroundImage: `url(${Banner})`,
        marginTop: "100px",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
        }}
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Trang chủ
          </Link>
          <Link underline="hover" color="inherit" href="/shop">
            Cửa Hàng
          </Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>
      </AppBar>
      <Box sx={{ mx: "auto", width: "80%", bgcolor: "#fff" }}>
        {/* Chi Tiết Sản Phẩm */}
        <Box sx={{ py: 2, px: 4, display: "flex" }}>
          {/* Right: Image */}
          <Grid
            sx={{
              width: "30%",
              marginRight: "50px",
            }}
          >
            {/* Main Image with Arrows */}
            <Box sx={{ position: "relative", marginBottom: 2 }}>
              <Box
                component="img"
                src={product.images[currentIndex]}
                alt={product.title}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
              />
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: -10,
                  transform: "translateY(-50%)",
                  backgroundColor: "white",
                  boxShadow: 1,
                }}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: -10,
                  transform: "translateY(-50%)",
                  backgroundColor: "white",
                  boxShadow: 1,
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              {product.images.slice(0, 3).map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  sx={{
                    width: "30%",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    border:
                      index === currentIndex
                        ? "2px solid #1976d2"
                        : "1px solid #ccc",
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Right: Product Info */}
          <Grid sx={{ width: "70%" }}>
            <Box sx={{ display: "flex", marginBottom: "10px", width: "100%" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "70%" }}
              >
                <Typography
                  sx={{ fontSize: "60px", margin: "auto 0", width: "100%" }}
                >
                  {product.title}
                </Typography>
                <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
                  <Rating
                    name="text-feedback"
                    value={product.rating}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2, fontSize: "20px" }}>{product.rating}</Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  margin: "auto",
                  display: "flex", // Dùng flex
                  justifyContent: "flex-end", // Đẩy nội dung sang phải
                }}
              >
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: "flex", width: "100%" }}>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Typography sx={{ margin: "auto 0", fontSize: "25px" }}>
                  Mã Sản Phẩm:
                </Typography>
                <Typography
                  sx={{
                    margin: "auto 0",
                    fontSize: "30px",
                    fontWeight: "bold",
                    paddingLeft: "20px",
                  }}
                >
                  P0001
                </Typography>
              </Box>
              <Chip
                icon={<EcoIcon />}
                label={`${product.recycledPercentage}% Tái Chế`}
                size="small"
                sx={{
                  backgroundColor: "rgba(200, 248, 217, 1)",
                  color: "rgba(22, 103, 86, 1)",
                  fontSize: "15px",
                  marginLeft: "auto",
                  fontWeight: "bold",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Typography sx={{ margin: "auto 0", fontSize: "25px" }}>
                Giá:
              </Typography>
              <Typography
                sx={{
                  margin: "auto 0",
                  fontSize: "30px",
                  fontWeight: "bold",
                  paddingLeft: "20px",
                }}
              >
                {product.price}
              </Typography>
            </Box>

            {/* Material */}
            <Box
              sx={{ display: "flex", width: "100%", flexDirection: "column" }}
            >
              <Typography sx={{ margin: "auto 0", fontSize: "25px" }}>
                Chất Liệu:
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                }}
              >
                {product.material.map((mat, index) => (
                  <Box
                    key={mat.materialName}
                    sx={{
                      width: `${mat.percentage}%`,
                      border: "2px solid",
                      borderColor:
                        materialColors[index % materialColors.length],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: materialColors[index % materialColors.length],
                      fontSize: 20,
                      padding: 2,
                      fontWeight: "bold",
                      flex: 1,
                    }}
                  >
                    {mat.materialName}: {mat.percentage}%
                  </Box>
                ))}{" "}
              </Box>
            </Box>

            {/* Color */}
            <Box>
              <Typography sx={{ margin: "auto 0", fontSize: "25px" }}>
                Màu sắc:
              </Typography>
              {/* Replace with mapped color swatches */}
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                {["#c9bfb3", "#c4c0b9", "#a09c92"].map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Size selector */}
            <Box sx={{ mt: 2, width: "100%" }}>
              <Typography sx={{ margin: "auto 0", fontSize: "25px" }}>
                Size:
              </Typography>
              <Box sx={{ display: "flex" }}>
                <ToggleButtonGroup
                  value={size}
                  exclusive
                  onChange={(e, newSize) => setSize(newSize)}
                  size="large"
                  sx={{ mt: 1 }}
                >
                  <ToggleButton value="S">S</ToggleButton>
                  <ToggleButton value="M">M</ToggleButton>
                  <ToggleButton value="L">L</ToggleButton>
                </ToggleButtonGroup>
                <Link
                  href={`/detail/${product.id}`}
                  sx={{ margin: "auto 0", marginLeft: "auto" }}
                >
                  Hướng dẫn chọn size
                </Link>{" "}
              </Box>
            </Box>

            {/* Số Lượng */}
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Typography sx={{ margin: "auto 0", fontSize: "25px" }}>
                Số Lượng:
              </Typography>
              <Button variant="outlined">-</Button>
              <Typography variant="h6">1</Typography>
              <Button variant="outlined">+</Button>
            </Box>

            {/* Buttons */}
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button variant="contained" color="success">
                Thêm vào giỏ
              </Button>
              <Button variant="outlined">Mua ngay</Button>
            </Box>
          </Grid>
        </Box>

        {/* Author Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            padding: 2,
          }}
        >
          <Grid
            sx={{
              width: "30%",
              margin: "10px",
              borderRight: "1px solid black",
              display: "flex",
            }}
          >
            <Avatar
              sx={{ margin: "auto 10px", height: "80px", width: "80px" }}
            />
            <Box
              sx={{
                margin: "auto ",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                  fontSize: "25px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {product.author}
              </Typography>
              <Typography sx={{ width: "100%", fontSize: "15px" }}>
                Online 3 phút trước
              </Typography>
            </Box>
          </Grid>
          <Grid
            sx={{
              width: "70%",
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid size={6}>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Typography sx={{ marginRight: "auto" }}>
                      Đánh Giá:
                    </Typography>
                    <Typography>80k</Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Typography sx={{ marginRight: "auto" }}>
                      Tham Gia:
                    </Typography>
                    <Typography>4 năm trước</Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Typography sx={{ marginRight: "auto" }}>
                      Sản Phẩm:
                    </Typography>
                    <Typography>800</Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Typography sx={{ marginRight: "auto" }}>
                      Người Theo Dõi:
                    </Typography>
                    <Typography>100k</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>

        {/* Thông Tin Mô Tả */}
        <Box
          sx={{
            width: "100%",
            borderBottom: "1px solid black",
            paddingBottom: "30px",
          }}
        >
          {/* Tabs */}
          <Box
            sx={{
              width: "100%",
              background: "rgba(241, 245, 249, 1)",
              margin: "30px auto",
              display: "flex",
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              textColor="primary"
              sx={{
                width: "100%",
                margin: "auto",
              }}
            >
              <Tab
                label="Chi Tiết Sản Phẩm"
                sx={{
                  flex: 1,
                  "&.Mui-selected": {
                    color: "primary", // Màu khi được chọn
                    fontWeight: "bold", // Tuỳ chọn: in đậm
                  },
                }}
              />
              <Tab
                label="Tính Bền Vững"
                sx={{
                  flex: 1,
                  "&.Mui-selected": {
                    color: "primary", // Màu khi được chọn
                    fontWeight: "bold", // Tuỳ chọn: in đậm
                  },
                }}
              />
              <Tab
                label="Đánh Giá"
                sx={{
                  flex: 1,
                  "&.Mui-selected": {
                    color: "primary", // Màu khi được chọn
                    fontWeight: "bold", // Tuỳ chọn: in đậm
                  },
                }}
              />
              <Tab label="Vận Chuyển Và Hoàn Tiền" sx={{ flex: 1 }} />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {/* Tab Chi tiết Sản Phẩm */}
          {tabIndex === 0 && (
            <Box sx={{ display: "flex", padding: 2 }}>
              {/* Mô Tả */}
              <Grid>
                <Typography variant="subtitle1" fontWeight="bold">
                  Mô Tả
                </Typography>
                <Typography
                  component="div"
                  sx={{ whiteSpace: "pre-line", fontSize: "15px" }}
                >
                  - Quần tây ống suông, hai túi sườn và hai túi mở ở thân sau.
                  {"\n"}- Lưng quần có thun ở thân sau tạo sự thoải mái.
                  {"\n"}- Chất liệu 100% linen cao cấp, đã trải qua bước xử lý
                  vải giúp làm mềm và không co rút khi giặt.
                  {"\n"}- Mặc được in trực tiếp lên sản phẩm để loại bỏ những cọ
                  xát khó chịu lên cơ thể nhưng giảm thiểu rác thời trang.
                  {"\n"}- Thiết kế ra mắt năm 2016 và được sản xuất tại Sài Gòn.
                </Typography>
              </Grid>

              {/* Đặc điểm và Bảo quản */}
              <Grid>
                <Typography variant="subtitle1" fontWeight="bold">
                  Đặc điểm
                </Typography>
                <List dense>
                  {[
                    "Thuốc nhuộm và quy trình ít tác động đến môi trường",
                    "Kết cấu bền chắc sử dụng lâu dài",
                    "Quy trình sản xuất có trách nhiệm",
                  ].map((text, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: "30px", color: "green" }}>
                        <EcoIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mt: 2 }}
                >
                  Hướng Dẫn Bảo Quản
                </Typography>
                <Typography variant="body2">
                  Giặt máy bằng nước lạnh với các màu tương tự. Sấy ở nhiệt độ
                  thấp. Không dùng thuốc tẩy. Ủi ở nhiệt độ ẩm nếu cần.
                </Typography>
              </Grid>
            </Box>
          )}
          {/* Tab Tính Bền Vững  */}
          {tabIndex === 1 && (
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  backgroundColor: "rgba(240, 253, 244, 1)",
                  borderRadius: 2,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 200,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EcoIcon />
                  <Typography variant="h6" fontWeight="bold">
                    Tác Động Môi Trường
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <Box
                    sx={{
                      width: "80%",
                      margin: "auto",
                      display: "flex",
                      padding: "30px",
                    }}
                  >
                    {/*  Water Saved */}
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#fff",
                        borderRadius: 2,
                        boxShadow: 1,
                        flex: 1,
                        margin: "0 10px",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        Tiết kiệm nước
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="primary"
                      >
                        2,700 L
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        So với quy trình sản xuất thông thường
                      </Typography>
                    </Box>

                    {/* CO₂ Reduced */}
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#fff",
                        borderRadius: 2,
                        boxShadow: 1,
                        flex: 1,
                        height: "100%",
                        margin: "0 10px",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        Giảm khí CO₂
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="success.main"
                      >
                        6 kg
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dấu chân carbon thấp hơn so với phương pháp sản xuất
                        thông thường.
                      </Typography>
                    </Box>

                    {/* Waste Diverted */}
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#fff",
                        borderRadius: 2,
                        boxShadow: 1,
                        flex: 1,
                        margin: "0 10px",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        Rác Thải Được Chuyển Hướng
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="success.main"
                      >
                        1,2 kg
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rác thải dệt may đã tránh được khỏi bãi rác
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "auto",
                  padding: 2,
                }}
              >
                {/* Mô Tả */}
                <Grid sx={{ width: "40%", marginRight: "auto" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Hành Trình Nguyên Liệu
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ whiteSpace: "pre-line", mt: 1 }}
                  >
                    Chất liệu denim tái chế của chúng tôi bắt đầu từ những chiếc
                    quần jean đã qua sử dụng được thu gom thông qua các chương
                    trình quyên góp quần áo. Những món đồ này được phân loại,
                    làm sạch và xử lý để tách sợi vải.
                    {"\n"}Sau đó, các sợi vải được xoắn thành sợi chỉ mới và dệt
                    thành vải denim. Quá trình này sử dụng lượng nước, năng
                    lượng và hóa chất ít hơn đáng kể so với sản xuất denim thông
                    thường. Các thành phần polyester tái chế được làm từ những
                    chai nhựa đã được thu thập, làm sạch và xử lý thành sợi
                    polyester.
                  </Typography>
                </Grid>

                {/* Đặc điểm và Bảo quản */}
                <Grid sx={{ width: "50%" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Chứng Chỉ
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <img
                          src={GRS}
                          style={{
                            height: "100px",
                            width: "90px",
                            background: "white",
                          }}
                        />
                      </ListItemIcon>

                      <ListItemText>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          Global Recycled Standard
                        </Typography>
                        <Typography sx={{ fontSize: "10px" }}>
                          Xác nhận thành phần tái chế và quy trình sản xuất có
                          trách nhiệm
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <img
                          src={OEKO}
                          style={{
                            height: "100px",
                            width: "90px",
                            background: "white",
                          }}
                        />
                      </ListItemIcon>

                      <ListItemText>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          OEKO-TEX Standard 100
                        </Typography>
                        <Typography sx={{ fontSize: "10px" }}>
                          Được chứng nhận không chứa chất gây hại
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Grid>
              </Box>
            </Box>
          )}
          {/* Tab Đánh Giá */}
          {tabIndex === 2 && (
            <Box sx={{ width: "100%", display: "flex" }}>
              {/* Left: Rating Summary */}
              <Grid sx={{ width: "30%" }}>
                <Box sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Đánh Giá
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{ width: 200, display: "flex", alignItems: "center" }}
                    >
                      <Rating
                        name="text-feedback"
                        value={product.rating}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      <Box sx={{ ml: 2, fontSize: "20px" }}>
                        {product.rating}
                      </Box>
                    </Box>
                  </Box>
                  {ratingData.map((item) => (
                    <Box
                      key={item.star}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <Typography sx={{ width: 40 }}>
                        {item.star} star
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.value}
                        sx={{
                          flex: 1,
                          height: 10,
                          borderRadius: 5,
                          mx: 1,
                          backgroundColor: "#e5e7eb",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#facc15",
                          },
                        }}
                      />
                      <Typography sx={{ width: 30 }}>{item.value}%</Typography>
                    </Box>
                  ))}
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#22c55e",
                      "&:hover": { backgroundColor: "#16a34a" },
                    }}
                  >
                    Viết Đánh Giá
                  </Button>
                </Box>
              </Grid>

              {/* Right: Scrollable Reviews */}
              <Grid sx={{ width: "70%" }}>
                <Box
                  sx={{
                    maxHeight: 400,
                    overflowY: "auto",
                    p: 2,
                    border: "1px solid #eee",
                    borderRadius: 2,
                  }}
                >
                  {reviews.map((review, index) => (
                    <Box key={index} mb={2}>
                      <Typography fontWeight="bold">{review.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.date}
                      </Typography>
                      <Box
                        sx={{
                          width: 200,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Rating
                          name="text-feedback"
                          value={review.rating}
                          readOnly
                          precision={0.5}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                        <Box sx={{ ml: 2, fontSize: "20px" }}>
                          {review.rating}
                        </Box>
                      </Box>
                      <Typography>{review.comment}</Typography>
                      {index < reviews.length - 1 && (
                        <Divider sx={{ mt: 2, mb: 2 }} />
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Box>
          )}
          {/* Tab Vận Chuyển*/}
          {tabIndex === 3 && (
            <Box sx={{ display: "flex", padding: 2 }}>
              {/* Mô Tả */}
              <Grid sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Hành Trình Nguyên Liệu
                </Typography>
                <Typography
                  component="div"
                  sx={{ whiteSpace: "pre-line", fontSize: "15px" }}
                >
                  Chúng tôi giao hàng bằng các phương thức vận chuyển trung hòa
                  carbon khi có thể.
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Thời Gian Giao Hàng Dự Kiến
                </Typography>
                <Typography
                  component="div"
                  sx={{ whiteSpace: "pre-line", fontSize: "15px" }}
                >
                  - Hà Nội: 5–7 ngày làm việc.
                  {"\n"}- Thành phố Hồ Chí Minh: 3–5 ngày làm việc.
                  {"\n"}- Vũng Tàu: 3-5 ngày làm việc.
                  {"\n"}- Nha Trang: 3-5 ngày làm việc
                </Typography>
              </Grid>

              {/* Đặc điểm và Bảo quản */}
              <Grid sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Trả Hàng & Đổi Hàng
                </Typography>
                <Typography
                  component="div"
                  sx={{ whiteSpace: "pre-line", fontSize: "15px" }}
                >
                  Chúng tôi muốn bạn hoàn toàn hài lòng với sản phẩm của mình.
                  Nếu bạn không hài lòng với đơn hàng, chúng tôi chấp nhận trả
                  hàng trong vòng 30 ngày kể từ ngày giao hàng.
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mt: 2 }}
                >
                  Chính Sách Trả Hàng
                </Typography>
                <List>
                  <ListItem>
                    Sản phẩm phải chưa qua sử dụng, chưa giặt và còn nguyên
                    trạng với nhãn mác đầy đủ
                  </ListItem>
                  <ListItem>
                    Chi phí vận chuyển trả hàng do khách hàng chịu trách nhiệm
                  </ListItem>
                  <ListItem>
                    Hoàn tiền sẽ được thực hiện qua phương thức thanh toán ban
                    đầu
                  </ListItem>
                  <ListItem>
                    Có thể đổi hàng với kích cỡ hoặc màu sắc khác
                  </ListItem>
                </List>
                <Typography fontWeight="bold" sx={{ mt: 2 }}>
                  Chú ý: Chính sách trả hàng của chúng tôi hỗ trợ tính bền vững
                  bằng cách giảm thiểu việc vận chuyển không cần thiết và rác
                  thải.
                </Typography>
              </Grid>
            </Box>
          )}
        </Box>

        {/* Related Products */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ float: "left", textDecoration: "underline" }}
          >
            Sản Phẩm Liên Quan
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
                        label={mat.materialName}
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
        </Box>
      </Box>
    </Box>
  );
}
