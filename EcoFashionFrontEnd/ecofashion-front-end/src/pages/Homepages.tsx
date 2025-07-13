import {
  AppBar,
  Box,
  Button,
  Grid,
  Typography,
  Stack,
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
  Link,
  InputBase,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import banner from "../assets/pictures/homepage/banner.jpg";
import post from "../assets/pictures/homepage/product-post.png";
import fashion from "../assets/pictures/homepage/fashion.png";
import material from "../assets/pictures/homepage/material.png";
import information from "../assets/pictures/homepage/information.png";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useAuth } from "../services/user/AuthContext";

//Icon
import { AddToCart, EcoIcon, FavoriteBorderIcon } from "../assets/icons/icon";
import { useEffect, useState } from "react";

//
import MaterialsSection from "../components/materials/MaterialsSection";
import { materials } from "../data/materialsData";
import FashionsSection from "../components/fashion/FashionsSection";
//example
import ao_linen from "../assets/pictures/example/ao-linen.webp";
import chan_vay_dap from "../assets/pictures/example/chan-vay-dap.webp";
import dam_con_trung from "../assets/pictures/example/dam-con-trung.webp";
import type { Fashion } from "../types/Fashion";
import SearchIcon from "@mui/icons-material/Search";

const products: Fashion[] = [
  {
    id: 1,
    name: "Áo thun Organic Cotton",
    category: "clothing",
    brand: { id: 1, name: "EcoWear" },
    image: ao_linen,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    discountPercentage: 18,
  },
  {
    id: 2,
    name: "Chân Váy Đắp",
    brand: { id: 2, name: "Nguyễn Công Trí" },
    category: "clothing",
    image: chan_vay_dap,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    discountPercentage: 18,
  },
  {
    id: 3,
    name: "Đầm Côn Trùng",
    brand: { id: 2, name: "Nguyễn Công Trí" },
    category: "clothing",
    image: dam_con_trung,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    discountPercentage: 18,
  },
  {
    id: 4,
    name: "Đầm Côn Trùng11",
    brand: { id: 2, name: "Nguyễn Công Trí" },
    category: "clothing",
    image: dam_con_trung,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    discountPercentage: 18,
  },
  {
    id: 5,
    name: "Đầm Côn Trùng12",
    brand: { id: 2, name: "Nguyễn Công Trí" },
    category: "clothing",
    image: dam_con_trung,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: false,
    isNew: true,
    discountPercentage: 18,
  },
];
const bestSellerProducts: Fashion[] = [
  {
    id: 1,
    name: "Áo thun Organic Cotton",
    category: "clothing",
    brand: { id: 1, name: "EcoWear" },
    image: ao_linen,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    discountPercentage: 18,
  },
  {
    id: 2,
    name: "Chân Váy Đắp",
    brand: { id: 2, name: "Nguyễn Công Trí" },
    category: "clothing",
    image: chan_vay_dap,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    discountPercentage: 18,
  },
  {
    id: 3,
    name: "Đầm Côn Trùng",
    brand: { id: 2, name: "Nguyễn Công Trí" },
    category: "clothing",
    image: dam_con_trung,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    discountPercentage: 18,
  },
  {
    id: 4,
    name: "Đầm Côn Trùng",
    brand: { id: 2, name: "Nguyễn Công Trí" },
    category: "clothing",
    image: dam_con_trung,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    discountPercentage: 18,
  },
  {
    id: 5,
    name: "Đầm Côn Trùng",
    brand: { id: 1, name: "EcoWear" },
    category: "clothing",
    image: dam_con_trung,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    discountPercentage: 18,
  },
  {
    id: 6,
    name: "Đầm Côn Trùng134",
    brand: { id: 1, name: "EcoWear" },
    category: "clothing",
    image: dam_con_trung,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop",
    ],
    sustainability: 85,
    materials: [
      {
        name: "Cotton hữu cơ",
        percentageUse: 40,
      },
      {
        name: "Vải Nilon",
        percentageUse: 60,
      },
    ],
    price: {
      current: 450000,
      original: 550000,
      currency: "VND",
    },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Trắng", "Đen", "Xanh Navy", "Xám"],
    availability: "in-stock",
    rating: {
      average: 4.5,
      count: 127,
    },
    description:
      "Áo thun làm từ 100% cotton hữu cơ, thoáng mát và thân thiện với môi trường. Thiết kế minimalist phù hợp với mọi phong cách.",
    features: [
      "100% Cotton hữu cơ",
      "Thoáng khí",
      "Co giãn nhẹ",
      "Dễ chăm sóc",
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: false,
    discountPercentage: 18,
  },
];

const StyledInput = styled(InputBase)({
  borderRadius: 20,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  flex: 1,
});

export default function Homepage() {
  const { user } = useAuth();

  // //Scroll Banner
  // const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 100);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Banner */}
      <Box
        sx={{
          height: "90vh",
          transition: "height 0.5s ease",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={banner}
          alt="EcoFashion Banner"
          style={{ width: "100%", height: "580", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
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
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="products">Thời trang</MenuItem>
                <MenuItem value="material">Vật liệu</MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                width: "85%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <StyledInput
                placeholder="Tìm kiếm.."
                fullWidth
                sx={{ border: "none" }}
              />
              <SearchIcon sx={{ color: "black", margin: "auto" }} />
            </Box>
          </Box>
          {user ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              width={"50%"}
              margin={"auto"}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  width: "50%",
                  marginTop: "30px",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  THỜI TRANG
                </Typography>
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
                  width: "50%",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  VẬT LIỆU
                </Typography>
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                  px: 4,
                  py: 1.5,
                }}
                href="/businessinfor?tab=designer"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Nhà Thiết Kế
                </Typography>
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                  px: 4,
                  py: 1.5,
                }}
                href="/businessinfor?tab=supplier"
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Nhà Cung Cấp
                </Typography>
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
                href="/register"
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
                  Đăng ký
                </Box>
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
      {/* Thông Tin Bền Vững */}
      <Box
        sx={{
          backgroundColor: "#f3f3f3",
          padding: "40px 10px",
          position: "relative",
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
        }}
      >
        {/* Thời Trang Mới */}
        <FashionsSection
          products={products}
          title="SẢN PHẨM NỔI BẬT"
          onProductSelect={(product) => {
            console.log("Selected product:", product.name);
            // TODO: Navigate to product detail or open modal
          }}
          onAddToCart={(product) => {
            console.log("Add to cart:", product.name);
            // TODO: Add to cart logic
          }}
          onToggleFavorite={(product) => {
            console.log("Toggle favorite:", product.name);
            // TODO: Toggle favorite logic
          }}
          onViewMore={() => {
            console.log("View more featured products");
            // TODO: Navigate to featured products page
          }}
        />
        <Divider
          sx={{ height: "2px", backgroundColor: "black", opacity: "20%" }}
        />
        {/* Bán Chạy Nhất */}
        <FashionsSection
          products={bestSellerProducts}
          title="BÁN CHẠY NHẤT"
          onProductSelect={(product) => {
            console.log("Selected product:", product.name);
            // TODO: Navigate to product detail or open modal
          }}
          onAddToCart={(product) => {
            console.log("Add to cart:", product.name);
            // TODO: Add to cart logic
          }}
          onToggleFavorite={(product) => {
            console.log("Toggle favorite:", product.name);
            // TODO: Toggle favorite logic
          }}
          onViewMore={() => {
            console.log("View more featured products");
            // TODO: Navigate to featured products page
          }}
        />
        <Divider
          sx={{ height: "2px", backgroundColor: "black", opacity: "20%" }}
        />
        {/* Nguyên Vật Liệu */}
        <MaterialsSection
          materials={materials.slice(0, 4)} // Show first 4 materials for homepage
          onMaterialSelect={(material) => {
            console.log("Selected material:", material.name);
            // TODO: Navigate to material detail or open modal
          }}
          onViewMore={() => {
            console.log("View more materials");
            // TODO: Navigate to materials page
          }}
        />
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
