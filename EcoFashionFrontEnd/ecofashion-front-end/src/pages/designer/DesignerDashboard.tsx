import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { UserAuth } from "../../services/AuthContext";
//Icon
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import { EcoIcon } from "../../assets/icons/icon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
//Example
import ao_linen from "../../assets/pictures/example/ao-linen.webp";
import chan_vay_dap from "../../assets/pictures/example/chan-vay-dap.webp";
import dam_con_trung from "../../assets/pictures/example/dam-con-trung.webp";

//Chart
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

export default function DesignerDashBoard() {
  window.scrollTo(0, 0);
  const stats = [
    {
      title: "Tổng Sản Phẩm",
      value: "24",
      subtitle: "3 sản phẩm mới tháng này",
      icon: <LocalMallOutlinedIcon />,
      color: "success.main",
    },
    {
      title: "Tổng Doanh Thu",
      value: "3.800.000đ",
      subtitle: "Tăng 12%",
      icon: <TrendingUpIcon />,
      color: "info.main",
    },
    {
      title: "Đánh Giá Trung Bình",
      value: "24",
      subtitle: "3 sản phẩm mới tháng này",
      icon: <StarIcon />,
      color: "warning.main",
    },
    {
      title: "Cộng Đồng",
      value: "156",
      subtitle: "12 lượt theo dõi mới",
      icon: <GroupIcon />,
      color: "secondary.main",
    },
  ];
  const material_stats = [
    {
      title: "Tổng Vật Liệu",
      value: "24",
      subtitle: "Tổng Tất Cả Các Loại Chất Liệ",
      icon: <LocalMallOutlinedIcon />,
      color: "success.main",
    },
    {
      title: "Tổng Tiền Vật Liệu",
      value: "3.800.000đ",
      subtitle: "Tổng Số Tiền Đã Chi",
      icon: <TrendingUpIcon />,
      color: "info.main",
    },
    {
      title: "Vật Liệu Sắp Hết",
      value: "24",
      subtitle: "Loại Cần Đặt",
      icon: <StarIcon />,
      color: "warning.main",
    },
    {
      title: "Tổng Mét Vải Hiện Có",
      value: "24",
      subtitle: "Mét Vải Hiện Có Trong Kho",
      icon: <GroupIcon />,
      color: "warning.main",
    },
  ];
  const messages = [
    {
      sender: "EcoTextiles",
      timeSend: "2 giờ trước",
      content: "Báo giá cho denim tái chế",
    },
    {
      sender: "GreenFabrics",
      timeSend: "5 giờ trước",
      content: "Có vải cotton hữu cơ mới",
    },
    {
      sender: "ReThread",
      timeSend: "6 giờ trước",
      content: "Xác nhận đơn hàng #RT-7842",
    },
  ];

  const orders = [
    {
      orderId: "ORD-01",
      product: "Áo Khoác Denim Tái Chế",
      status: 1, //1: Đang Vận Chuyển, 2: Chưa Xử Lý, 3: Đã Giao Hàng
    },
    {
      orderId: "ORD-02",
      product: "Túi Tote Tái Chế (2 cái)",
      status: 2, //1: Đang Vận Chuyển, 2: Chưa Xử Lý, 3: Đã Giao Hàng
    },
    {
      orderId: "ORD-03",
      product: "Khăn Choàng Thân Với Môi Trường",
      status: 3, //1: Đang Vận Chuyển, 2: Chưa Xử Lý, 3: Đã Giao Hàng
    },
  ];

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
      sale_quantity: 15,
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
      sale_quantity: 15,
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
      sale_quantity: 15,
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
      sale_quantity: 15,
    },
    {
      id: 5,
      title: "Áo Linen",
      author: "Nguyễn Công Trí",
      image: ao_linen, // replace with actual image paths
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 90,
      material: ["Vải Cotton", "Vải Linen"],
      sale_quantity: 15,
    },
    {
      id: 6,
      title: "Chân Váy Đắp",
      author: "Nguyễn Công Trí",
      image: chan_vay_dap,
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 95,
      material: ["Vải Cotton", "Vải Linen", "Vải Sợi"],
      sale_quantity: 15,
    },
    {
      id: 7,
      title: "Đầm Côn Trùng",
      author: "Nguyễn Công Trí",
      image: dam_con_trung,
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 100,
      material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
      sale_quantity: 15,
    },
    {
      id: 8,
      title: "Đầm Côn Trùng",
      author: "Nguyễn Công Trí",
      image: dam_con_trung,
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 100,
      material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
      sale_quantity: 15,
    },
    {
      id: 9,
      title: "Áo Linen",
      author: "Nguyễn Công Trí",
      image: ao_linen, // replace with actual image paths
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 90,
      material: ["Vải Cotton", "Vải Linen"],
      sale_quantity: 15,
    },
    {
      id: 10,
      title: "Chân Váy Đắp",
      author: "Nguyễn Công Trí",
      image: chan_vay_dap,
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 95,
      material: ["Vải Cotton", "Vải Linen", "Vải Sợi"],
      sale_quantity: 15,
    },
    {
      id: 11,
      title: "Đầm Côn Trùng",
      author: "Nguyễn Công Trí",
      image: dam_con_trung,
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 100,
      material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
      sale_quantity: 15,
    },
    {
      id: 12,
      title: "Đầm Côn Trùng",
      author: "Nguyễn Công Trí",
      image: dam_con_trung,
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 100,
      material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
      sale_quantity: 15,
    },
    {
      id: 13,
      title: "Áo Linen",
      author: "Nguyễn Công Trí",
      image: ao_linen, // replace with actual image paths
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 90,
      material: ["Vải Cotton", "Vải Linen"],
      sale_quantity: 15,
    },
    {
      id: 14,
      title: "Chân Váy Đắp",
      author: "Nguyễn Công Trí",
      image: chan_vay_dap,
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 95,
      material: ["Vải Cotton", "Vải Linen", "Vải Sợi"],
      sale_quantity: 15,
    },
    {
      id: 15,
      title: "Đầm Côn Trùng",
      author: "Nguyễn Công Trí",
      image: dam_con_trung,
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 100,
      material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
      sale_quantity: 15,
    },
    {
      id: 16,
      title: "Đầm Côn Trùng",
      author: "Nguyễn Công Trí",
      image: dam_con_trung,
      price: "1.900.000₫",
      rating: 4,
      recycledPercentage: 100,
      material: ["Vải Cotton", "Vải Linen", "Vải Denim"],
      sale_quantity: 15,
    },
  ];

  const yearData = [
    { label: "Jan", revenue: 64854, cost: 32652 },
    { label: "Feb", revenue: 54628, cost: 42393 },
    { label: "Mar", revenue: 117238, cost: 50262 },
    { label: "Apr", revenue: 82830, cost: 64731 },
    { label: "May", revenue: 91208, cost: 41893 },
    { label: "Jun", revenue: 103609, cost: 83809 },
    { label: "Jul", revenue: 90974, cost: 44772 },
    { label: "Aug", revenue: 82919, cost: 37590 },
    { label: "Sep", revenue: 62407, cost: 43349 },
    { label: "Oct", revenue: 82528, cost: 45324 },
    { label: "Nov", revenue: 56979, cost: 47978 },
    { label: "Dec", revenue: 87436, cost: 39175 },
  ];

  const weekData = [
    { label: "Mon", revenue: 12000, cost: 5000 },
    { label: "Tue", revenue: 9000, cost: 4500 },
    { label: "Wed", revenue: 15000, cost: 6000 },
    { label: "Thu", revenue: 11000, cost: 4000 },
    { label: "Fri", revenue: 16000, cost: 7000 },
    { label: "Sat", revenue: 18000, cost: 8000 },
    { label: "Sun", revenue: 10000, cost: 3000 },
  ];

  const monthData = [
    { label: "Week 1", revenue: 50000, cost: 23000 },
    { label: "Week 2", revenue: 62000, cost: 27000 },
    { label: "Week 3", revenue: 58000, cost: 24000 },
    { label: "Week 4", revenue: 60000, cost: 25000 },
  ];

  const [range, setRange] = useState("year");

  const getCurrentData = () => {
    if (range === "week") return weekData;
    if (range === "month") return monthData;
    return yearData;
  };
  const chartData = getCurrentData();

  const { user } = UserAuth();
  //Change Tabs
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const pageSize = 6;
  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  const handlePagination = (event: any, page: number) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setPagination({ from, to });
  };

  const displayedProducts = products.slice(pagination.from, pagination.to);

  const DesignCard = ({ product }: { product: any }) => (
    <Card
      sx={{
        width: "80%",
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      {/* Recycled Chip */}
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
          label={`${product.recycledPercentage}% Tái Chế`}
          size="small"
          sx={{
            backgroundColor: "rgba(200, 248, 217, 1)",
            color: "rgba(22, 103, 86, 1)",
            fontSize: "15px",
          }}
        />
      </Box>

      {/* Dynamic Height Image */}
      <Box width="100%" sx={{ overflow: "hidden" }}>
        <Link style={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </Link>
      </Box>

      {/* Content */}
      <CardContent sx={{ textAlign: "left" }}>
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
          {product.title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight="bold" mt={1} sx={{ opacity: "50%" }}>
            Đã Bán Được: {product.sale_quantity} sản phẩm
          </Typography>
          <Typography fontWeight="bold" mt={1}>
            {product.price}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Button variant="contained" fullWidth sx={{ mt: 1, flex: 1 }}>
            Chỉnh Sửa
          </Button>
          <Button variant="outlined" fullWidth sx={{ mt: 1, flex: 1 }}>
            Chi Tiết
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const columns: GridColDef<(typeof materials)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "material",
      headerName: "Chất Liệu",
      width: 110,
      editable: true,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Số Lượng",
      width: 110,
      editable: true,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Trạng Thái",
      width: 110,
      editable: true,
      renderCell: (params) => {
        let color:
          | "default"
          | "primary"
          | "secondary"
          | "error"
          | "info"
          | "success"
          | "warning" = "default";
        switch (params.value) {
          case "In Stock":
            color = "success";
            break;
          case "Low Stock":
            color = "warning";
            break;
          case "Out of Stock":
            color = "error";
            break;
          default:
            color = "default";
        }

        return <Chip label={params.value} color={color} size="small" />;
      },
      flex: 1,
    },
    {
      field: "supplier",
      headerName: "Nhà Cung Cấp",
      width: 110,
      editable: true,
      flex: 1,
    },
    {
      field: "costPerUnit",
      headerName: "Giá 1 Mét Vải",
      width: 110,
      editable: true,
      flex: 1,
    },
    {
      field: "totalValue",
      headerName: "Tổng Tiền Chi",
      width: 110,
      editable: true,
      flex: 1,
    },
    {
      field: "lastUpdated",
      headerName: "Ngày Cập Nhật",
      width: 150,
      editable: true,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Hành Động",
      width: 120,
      sortable: false,
      filterable: false,
      headerAlign: "right",
      disableColumnMenu: true,
      renderCell: (params) => {
        const handleEdit = () => {
          // Replace with your edit logic
          console.log("Edit item:", params.row);
        };

        const handleDelete = () => {
          // Replace with your delete logic
          console.log("Delete item:", params.row);
        };

        return (
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={handleEdit} color="primary">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleDelete} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
        );
      },
      flex: 1,
    },
  ];

  const materials = [
    {
      id: 1,
      material: "Cotton Fabric",
      quantity: "500m",
      status: "In Stock",
      supplier: "ABC Textiles Co.",
      costPerUnit: "3.000đ",
      totalValue: "1.750.000đ",
      lastUpdated: "2025-07-01",
    },
    {
      id: 2,
      material: "Steel Rods",
      quantity: "200m",
      status: "Low Stock",
      supplier: "Global Steels Ltd.",
      costPerUnit: "12.000đ",
      totalValue: "2.400.000đ",
      lastUpdated: "2025-06-30",
    },
    {
      id: 3,
      material: "Plastic Pellets",
      quantity: "1000m",
      status: "In Stock",
      supplier: "PolySource Inc.",
      costPerUnit: "1.250.000đ",
      totalValue: "1.250.000đ",
      lastUpdated: "2025-07-02",
    },
    {
      id: 4,
      material: "Screws (M5)",
      quantity: "5000m",
      status: "In Stock",
      supplier: "BoltMaster Supplies",
      costPerUnit: "50.000đ",
      totalValue: "250.000đ",
      lastUpdated: "2025-07-02",
    },
    {
      id: 5,
      material: "Leather Sheets",
      quantity: "120m",
      status: "Out of Stock",
      supplier: "Urban Leathers Co.",
      costPerUnit: "7.000đ",
      totalValue: "840.000đ",
      lastUpdated: "2025-06-28",
    },
    {
      id: 6,
      material: "Copper Wire",
      quantity: "300m",
      status: "In Stock",
      supplier: "WireWorks Industries",
      costPerUnit: "56.000đ",
      totalValue: "1.680.000đ",
      lastUpdated: "2025-07-01",
    },
    {
      id: 7,
      material: "Cardboard Boxes",
      quantity: "1500m",
      status: "In Stock",
      supplier: "PackPro Ltd.",
      costPerUnit: "40.000đ",
      totalValue: "600.000đ",
      lastUpdated: "2025-07-02",
    },
    {
      id: 8,
      material: "Rubber Seals",
      quantity: "800m",
      status: "Low Stock",
      supplier: "SealTech Corp.",
      costPerUnit: "75.000đ",
      totalValue: "600.000đ",
      lastUpdated: "2025-06-29",
    },
  ];

  return (
    <Box sx={{ width: "95%", margin: "auto" }}>
      {/* Top Part */}
      <Box sx={{ width: "100%", display: "flex" }}>
        {/* Title */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>
            Designer Dashboard
          </Typography>
          <Typography>Chào mừng trở lại, {user?.fullName}</Typography>
        </Box>
        {/* Button */}
        <Box sx={{ display: "flex", marginLeft: "auto", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "black",
              marginRight: "20px",
              height: "60%",
              margin: "auto",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              Tìm Kiếm Vật Liệu
            </Typography>
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "rgba(22, 163, 74)",
              "&:hover": { bgcolor: "white", color: "rgba(22, 163, 74)" },
              px: 4,
              py: 1.5,
              height: "60%",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AddIcon />
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": {
                    color: "rgba(22, 163, 74, 0.55)",
                  },
                }}
              >
                Thêm Sản Phẩm
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
      {/* Tab Part */}
      <Box
        sx={{
          width: "30%",
          background: "rgba(241, 245, 249, 1)",
          display: "flex",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          sx={{
            width: "100%",
            margin: "auto",
          }}
          TabIndicatorProps={{
            sx: {
              backgroundColor: "rgba(22, 163, 74)",
              borderRadius: "2px",
            },
          }}
        >
          <Tab
            label="Trang chủ"
            sx={{
              flex: 1,
              "&.Mui-selected": {
                color: "rgba(22, 163, 74)", // Màu khi được chọn
                fontWeight: "bold", // Tuỳ chọn: in đậm
              },
            }}
          />
          <Tab
            label="Thời Trang"
            sx={{
              flex: 1,
              "&.Mui-selected": {
                color: "rgba(22, 163, 74)", // Màu khi được chọn
                fontWeight: "bold", // Tuỳ chọn: in đậm
              },
            }}
          />
          <Tab
            label="Kho Vật Liệu"
            sx={{
              flex: 1,
              "&.Mui-selected": {
                color: "rgba(22, 163, 74)", // Màu khi được chọn
                fontWeight: "bold", // Tuỳ chọn: in đậm
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {/* Tab Trang Chủ */}
      {tabIndex === 0 && (
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 3,
            }}
          >
            {stats.map((item, index) => (
              <Grid key={index} sx={{ flex: 1, margin: "20px 0" }}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        {item.title}
                      </Typography>
                      <Avatar
                        sx={{ bgcolor: item.color, width: 35, height: 35 }}
                      >
                        {item.icon}
                      </Avatar>
                    </Stack>
                    <Typography variant="h5" fontWeight="bold" mt={1}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="success.main" mt={0.5}>
                      ↗ {item.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Box>
          {/* Graph & Popular Product*/}
          <Box width={"100%"} sx={{ display: "flex", gap: 3 }}>
            <Stack direction="row" sx={{ width: "100%" }} spacing={3}>
              {/* Graph */}
              <Card sx={{ width: "60%", flex: 1 }}>
                <Box
                  sx={{ border: "1px solid rgba(0, 0, 0, 0.1)", padding: 3 }}
                >
                  <Box width={"100%"} sx={{ display: "flex" }}>
                    <Box
                      width={"100%"}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                        Tổng Quan Doanh Thu
                      </Typography>
                      <Typography sx={{ opacity: "50%" }}>
                        Doanh số sản phẩm của bạn trong{" "}
                        {`${
                          range === "week"
                            ? "1 tuần"
                            : range === "month"
                            ? "1 tháng"
                            : "1 năm"
                        }`}{" "}
                        qua
                      </Typography>{" "}
                    </Box>
                    <Select
                      defaultValue="week"
                      sx={{
                        border: "none",
                        fontSize: 14,
                        minWidth: 100,
                      }}
                    >
                      <MenuItem value="week" onClick={() => setRange("week")}>
                        1 Tuần
                      </MenuItem>
                      <MenuItem value="month" onClick={() => setRange("month")}>
                        1 Tháng
                      </MenuItem>
                      <MenuItem value="year" onClick={() => setRange("year")}>
                        1 Năm
                      </MenuItem>
                    </Select>
                  </Box>
                  <Line
                    data={{
                      labels: chartData.map((d) => d.label),
                      datasets: [
                        {
                          label: "Doanh Thu",
                          data: chartData.map((d) => d.revenue),
                          backgroundColor: "#064FF0",
                          borderColor: "#064FF0",
                        },
                        {
                          label: "Chi Phí",
                          data: chartData.map((d) => d.cost),
                          backgroundColor: "#FF3030",
                          borderColor: "#FF3030",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      elements: {
                        line: {
                          tension: 0.4,
                        },
                      },
                      plugins: {
                        legend: { position: "top" },
                        title: {
                          display: true,
                          // text: `Biểu đồ ${
                          //   range === "week"
                          //     ? "Tuần"
                          //     : range === "month"
                          //     ? "Tháng"
                          //     : "Năm"
                          // }`,
                        },
                      },
                    }}
                  />
                </Box>
              </Card>
              {/* Popular Product */}
              <Card sx={{ width: "60%", flex: 1 }}>
                <Box
                  sx={{ border: "1px solid rgba(0, 0, 0, 0.1)", padding: 3 }}
                >
                  {/* Title */}
                  <Box
                    width="100%"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                        Sản Phẩm Hàng Đầu
                      </Typography>
                      <Typography sx={{ opacity: "50%" }}>
                        Sản phẩm bán chạy nhất của bạn
                      </Typography>
                    </Box>
                  </Box>

                  <Stack
                    spacing={2}
                    sx={{
                      mt: 2,
                      maxHeight: 300, // set max height for scroll area
                      overflowY: "auto",
                      pr: 1,
                      scrollbarWidth: "thin",
                      "&::-webkit-scrollbar": {
                        width: 6,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: 4,
                      },
                    }}
                  >
                    {products.map((item) => (
                      <Button
                        key={item.id}
                        variant="outlined"
                        sx={{
                          borderColor: "rgba(0,0,0,0.1)",
                          textTransform: "none",
                          width: "100%",
                          padding: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {/* Left side */}
                        <Box sx={{ textAlign: "left" }}>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "black",
                              mb: 1,
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Chip
                              icon={<EcoIcon />}
                              label={`${item.recycledPercentage}% Tái Chế`}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(200, 248, 217, 1)",
                                color: "rgba(22, 103, 86, 1)",
                                marginRight: 1,
                                fontWeight: "bold",
                              }}
                            />
                            <Typography
                              sx={{
                                color: "black",
                                opacity: 0.4,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Bán Được {item.sale_quantity} Sản Phẩm
                            </Typography>
                          </Box>
                        </Box>

                        {/* Right side */}
                        <Typography
                          sx={{ color: "black", whiteSpace: "nowrap", ml: 2 }}
                        >
                          Chi Tiết
                        </Typography>
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </Card>
            </Stack>
          </Box>
        </Box>
      )}
      {/* Tab Sản Phẩm  */}
      {tabIndex === 1 && (
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={5} sx={{ width: "100%", margin: "20px 0" }}>
            {displayedProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <DesignCard product={product} />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" sx={{ width: "100%", border: "1px solid black" }}>
            <Pagination
              count={Math.ceil(products.length / pageSize)}
              showFirstButton
              showLastButton
              onChange={handlePagination}
            />
            {/* <Typography sx={{ mb: 2, margin: "auto 0" }}>
              {pagination.from + 1} - {Math.min(pagination.to, products.length)}{" "}
              của {products.length} sản phẩm
            </Typography> */}
          </Box>
        </Box>
      )}
      {/* Tab Vật Liệu*/}
      {tabIndex === 2 && (
        <Box sx={{ width: "100%" }}>
          {/* Material Stat */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 3,
            }}
          >
            {material_stats.map((item, index) => (
              <Grid key={index} sx={{ flex: 1, margin: "20px 0" }}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        {item.title}
                      </Typography>
                      <Avatar
                        sx={{ bgcolor: item.color, width: 35, height: 35 }}
                      >
                        {item.icon}
                      </Avatar>
                    </Stack>
                    <Typography variant="h5" fontWeight="bold" mt={1}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="success.main" mt={0.5}>
                      {item.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Box>
          {/* Table */}
          <DataGrid
            rows={materials}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
              width: "100%", // or set a fixed px width like "800px"
            }}
          />
        </Box>
      )}

      {/* Bottom Part */}
      <Box sx={{ width: "100%", display: "flex", gap: 3, margin: "30px 0" }}>
        {/* Card Công Cụ Thiết Kế */}
        <Card
          sx={{
            textAlign: "center",
            p: 2,
            flex: 1,
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", margin: "10px 0", gap: 1 }}>
            <PaletteOutlinedIcon color="success" sx={{ margin: "auto 0" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Thiết Kế
            </Typography>
          </Box>
          <Stack spacing={2} marginBottom={3}>
            {/* Thiết Kế Rập */}
            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(0,0,0,0.1)",
                textTransform: "none",
              }}
            >
              <DesignServicesOutlinedIcon color="success" />
              <Box
                sx={{
                  textAlign: "left",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "auto",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    marginRight: "auto",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Thiết Kế Rập
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    opacity: "40%",
                  }}
                >
                  Tạo ra các mẫu rập bền vững
                </Typography>
              </Box>
            </Button>
            {/* Tính Bền Vững */}
            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(0,0,0,0.1)",
                textTransform: "none",
              }}
            >
              <CalculateOutlinedIcon color="success" />
              <Box
                sx={{
                  textAlign: "left",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "auto",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    marginRight: "auto",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Máy Tính Bền Vững
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    opacity: "40%",
                  }}
                >
                  Đo lường tác động đến môi trường
                </Typography>
              </Box>
            </Button>
            {/* Mẫu Đã Thiết Kế */}
            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(0,0,0,0.1)",
                textTransform: "none",
              }}
            >
              <DrawOutlinedIcon color="success" />
              <Box
                sx={{
                  textAlign: "left",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "auto",
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    marginRight: "auto",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Mẫu Thiết Kế Của Bản Thân
                </Typography>
                <Typography
                  sx={{
                    color: "black",
                    opacity: "40%",
                  }}
                >
                  Xem toàn bộ các thiết kế đã lưu
                </Typography>
              </Box>
            </Button>
          </Stack>

          <Button variant="contained" color="success">
            Khám phá Hết
          </Button>
        </Card>

        {/* Card Liên Lạc */}
        <Card
          sx={{
            width: 300,
            textAlign: "center",
            p: 2,
            flex: 1,
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", margin: "10px 0", gap: 1 }}>
            <ChatBubbleOutlineIcon color="success" sx={{ margin: "auto 0" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Liên Lạc
            </Typography>
          </Box>
          <Stack spacing={2} marginBottom={3}>
            {messages.map((item, index) => (
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(0,0,0,0.1)",
                  textTransform: "none",
                }}
              >
                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box
                    sx={{
                      textAlign: "left",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                        marginRight: "auto",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {item.sender}
                    </Typography>
                    <Typography
                      sx={{
                        width: "100%",
                        color: "black",
                        opacity: "40%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.content}
                    </Typography>
                  </Box>
                  <Typography color="black">{item.timeSend}</Typography>
                </Box>
              </Button>
            ))}
          </Stack>

          <Button variant="contained" color="success">
            Xem toàn bộ tin nhắn
          </Button>
        </Card>

        {/* Card Quản Lí Giao Hàng */}
        <Card
          sx={{
            width: 300,
            textAlign: "center",
            p: 2,
            flex: 1,
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", margin: "10px 0", gap: 1 }}>
            <LocalShippingOutlinedIcon
              color="success"
              sx={{ margin: "auto 0" }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Quản Lý Đơn Hàng
            </Typography>
          </Box>
          <Stack spacing={2} marginBottom={3}>
            {orders.map((item, index) => (
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(0,0,0,0.1)",
                  textTransform: "none",
                }}
              >
                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box
                    sx={{
                      textAlign: "left",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "auto",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                        marginRight: "auto",
                        fontWeight: "bold",
                        color: "black",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.product}
                    </Typography>
                    <Typography
                      sx={{
                        color: "black",
                        opacity: "40%",
                      }}
                    >
                      {item.orderId}
                    </Typography>
                  </Box>
                  {/* Conditional Chip */}
                  {item.status === 1 ? (
                    <Chip
                      label="Đang vận chuyển"
                      sx={{
                        backgroundColor: "rgba(219, 234, 254, 1)",
                        color: "rgba(62, 92, 188, 1)",
                      }}
                    />
                  ) : item.status === 2 ? (
                    <Chip
                      label="Chưa Xử Lý"
                      sx={{
                        backgroundColor: "rgba(220, 252, 231, 1)",
                        color: "rgba(59, 129, 86, 1)",
                      }}
                    />
                  ) : item.status === 3 ? (
                    <Chip
                      label="Đã hoàn thành"
                      sx={{
                        backgroundColor: "rgba(254, 249, 195, 1)",
                        color: "rgba(139, 86, 23, 1)",
                      }}
                    />
                  ) : (
                    <Chip label="Không Xác Định" color="error" />
                  )}
                </Box>
              </Button>
            ))}
          </Stack>

          <Button variant="contained" color="success">
            Xem toàn bộ đơn hàng
          </Button>
        </Card>
      </Box>
    </Box>
  );
}
