import { UserAuth } from "../services/AuthContext";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Rating,
  Chip,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowForward,
  ArrowBack,
  FavoriteBorder,
  ShoppingCart,
  Recycling,
  People,
} from "@mui/icons-material";
import "./Homepage.css";

// Sample product data
const featuredProducts = [
  {
    id: 1,
    name: "Đầm Cổ Tròn",
    price: "1.800.000đ",
    originalPrice: "2.200.000đ",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    badge: "NEW",
    sale: true,
  },
  {
    id: 2,
    name: "Áo Thun Tái Chế",
    price: "1.500.000đ",
    originalPrice: "1.800.000đ",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
    badge: "ECO",
    sale: true,
  },
  {
    id: 3,
    name: "Chân Váy Maxi",
    price: "1.600.000đ",
    originalPrice: "2.000.000đ",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d14?w=300&h=400&fit=crop",
    badge: "SALE",
    sale: true,
  },
];

const bestSellerProducts = [
  {
    id: 4,
    name: "Đầm Cổ Tròn",
    price: "1.800.000đ",
    originalPrice: "2.200.000đ",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
    badge: "BEST",
  },
  {
    id: 5,
    name: "Áo Thun Tái Chế",
    price: "1.500.000đ",
    originalPrice: "1.800.000đ",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=400&fit=crop",
    badge: "HOT",
  },
  {
    id: 6,
    name: "Chân Váy Maxi",
    price: "1.600.000đ",
    originalPrice: "2.000.000đ",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop",
    badge: "NEW",
  },
];

const stats = [
  { value: "500+", label: "Nhà Thiết Kế" },
  { value: "400+", label: "Vật Liệu Tái Chế" },
  { value: "5000+", label: "Sản Phẩm" },
  { value: "120t", label: "Vật Liệu Được Tái Chế" },
];

export default function Homepages() {
  const { user } = UserAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  // thông báo chào mừng dựa trên role
  const getWelcomeMessage = () => {
    if (!user) return null;

    const role = user.role?.toLowerCase();
    const userName = user.fullName || user.email?.split("@")[0] || "User";

    switch (role) {
      case "designer":
        return {
          greeting: `Chào mừng trở lại, ${userName}! 🎨`,
          subtitle:
            "Bạn đã sẵn sàng tạo ra những thiết kế bền vững tuyệt vời chưa?",
          actions: [
            {
              text: "Quản Lý Thiết Kế",
              variant: "contained",
              link: "/designer/profile",
            },
            { text: "Tạo Sản Phẩm Mới", variant: "outlined" },
          ],
        };
      case "admin":
        return {
          greeting: `Chào mừng Admin ${userName}! ⚡`,
          subtitle: "Quản lý hệ thống EcoFashion một cách hiệu quả",
          actions: [
            {
              text: "Bảng Điều Khiển",
              variant: "contained",
              link: "/admin/dashboard",
            },
            { text: "Quản Lý Users", variant: "outlined" },
          ],
        };
      case "supplier":
        return {
          greeting: `Chào mừng ${userName}! 📦`,
          subtitle: "Cung cấp nguyên liệu bền vững cho cộng đồng thời trang",
          actions: [
            {
              text: "Hồ Sơ Nhà Cung Cấp",
              variant: "contained",
              link: "/supplier/profile",
            },
            { text: "Quản Lý Kho", variant: "outlined" },
          ],
        };
      default:
        return {
          greeting: `Chào mừng trở lại, ${userName}! 👋`,
          subtitle:
            "Khám phá thời trang bền vững và tìm những sản phẩm yêu thích",
          actions: [
            { text: "Bắt Đầu Mua Sắm", variant: "contained" },
            { text: "Khám Phá Sản Phẩm", variant: "outlined" },
          ],
        };
    }
  };

  const ProductCard = ({ product }: { product: any }) => (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          transition: "all 0.3s ease",
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="280"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        {product.badge && (
          <Chip
            label={product.badge}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor:
                product.badge === "NEW"
                  ? "#4caf50"
                  : product.badge === "ECO"
                  ? "#2e7d32"
                  : product.badge === "SALE"
                  ? "#f44336"
                  : product.badge === "BEST"
                  ? "#ff9800"
                  : "#9c27b0",
              color: "white",
              fontWeight: "bold",
            }}
          />
        )}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
          }}
        >
          <FavoriteBorder />
        </IconButton>
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ mb: 1, fontSize: "1rem" }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
            ({product.rating})
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {product.price}
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="caption"
                sx={{ textDecoration: "line-through", color: "text.secondary" }}
              >
                {product.originalPrice}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCart />}
            sx={{
              bgcolor: "#4caf50",
              "&:hover": { bgcolor: "#388e3c" },
              borderRadius: 2,
            }}
            onClick={() => {
              // Có thể thêm logic thêm vào giỏ hàng ở đây
              console.log(`Thêm ${product.name} vào giỏ hàng`);
            }}
          >
            {user ? "Thêm vào giỏ" : "Xem chi tiết"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      {/*  Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Kiến Tạo Phong Cách, Gắn Kết
            <br />
            Cộng Đồng, Hướng Tới Thời Trang
            <br />
            Bền Vững
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Hãy Cùng Tham Gia Phong Trào Thay Đổi Ngành Thời Trang với
            <br />
            Các Sản Phẩm Thì Thiết Kế Tái Chế Và Bền Vững
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {user ? (
              <>
                {(() => {
                  const welcomeMsg = getWelcomeMessage();
                  return (
                    <>
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, width: "100%", textAlign: "center" }}
                      >
                        {welcomeMsg?.greeting}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 3,
                          width: "100%",
                          textAlign: "center",
                          opacity: 0.9,
                        }}
                      >
                        {welcomeMsg?.subtitle}
                      </Typography>
                      {welcomeMsg?.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant={action.variant as "contained" | "outlined"}
                          size="large"
                          component={action.link ? Link : "button"}
                          to={action.link || undefined}
                          sx={{
                            bgcolor:
                              action.variant === "contained"
                                ? "#4caf50"
                                : "transparent",
                            borderColor:
                              action.variant === "outlined"
                                ? "white"
                                : undefined,
                            color:
                              action.variant === "outlined"
                                ? "white"
                                : undefined,
                            "&:hover": {
                              bgcolor:
                                action.variant === "contained"
                                  ? "#388e3c"
                                  : "rgba(255,255,255,0.1)",
                              borderColor:
                                action.variant === "outlined"
                                  ? "white"
                                  : undefined,
                            },
                            px: 4,
                            py: 1.5,
                          }}
                        >
                          {action.text}
                        </Button>
                      ))}
                    </>
                  );
                })()}
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Khám Phá Ngay
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Mua Sắm
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/register"
                  sx={{
                    bgcolor: "#4caf50",
                    "&:hover": { bgcolor: "#388e3c" },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Đăng Ký / Đăng Nhập
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            textAlign: "center",
            justifyContent: "space-around",
          }}
        >
          {stats.map((stat, index) => (
            <Box key={index} sx={{ flex: "1 1 200px", minWidth: 150 }}>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontWeight: "bold", color: "#4caf50", mb: 1 }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Search Bar */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          <Typography sx={{ mr: 2, color: "text.secondary" }}>🔍</Typography>
          <Box
            component="input"
            placeholder="Tìm kiếm sản phẩm..."
            sx={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "1rem",
              bgcolor: "transparent",
            }}
          />
          <Button variant="text" sx={{ color: "text.secondary" }}>
            Tìm kiếm nâng cao
          </Button>
        </Paper>
      </Container>

      {/* Three Column Feature Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Card
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              p: 3,
              flex: 1,
            }}
          >
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <People sx={{ fontSize: 40, color: "#4caf50", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Cho mọi người thay sự
                <br />
                sang tạo của bạn
              </Typography>
              <Button
                variant="text"
                endIcon={<ArrowForward />}
                sx={{ color: "#4caf50", mt: 1 }}
              >
                Đăng sản phẩm
              </Button>
            </Box>
          </Card>
          <Card
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              p: 3,
              flex: 1,
            }}
          >
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Recycling sx={{ fontSize: 40, color: "#4caf50", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Khám phá xu hướng
                <br />
                thời trang hiện này
              </Typography>
              <Button
                variant="text"
                endIcon={<ArrowForward />}
                sx={{ color: "#4caf50", mt: 1 }}
              >
                Khám Phá
              </Button>
            </Box>
          </Card>
          <Card
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              p: 3,
              flex: 1,
            }}
          >
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Box sx={{ fontSize: 40, mb: 2 }}>💚</Box>
              <Typography variant="h6" gutterBottom>
                Lựa chọn chất liệu tái
                <br />
                chế có chất lượng tuyệt
                <br />
                vời
              </Typography>
              <Button
                variant="text"
                endIcon={<ArrowForward />}
                sx={{ color: "#4caf50", mt: 1 }}
              >
                Mua Bán
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold">
            THỜI TRANG MỚI
          </Typography>
          <Box>
            <IconButton
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={() => setCurrentSlide(Math.min(2, currentSlide + 1))}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {featuredProducts.map((product) => (
            <Box key={product.id} sx={{ flex: "1 1 300px", minWidth: 280 }}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: "#4caf50", borderColor: "#4caf50" }}
          >
            XEM THÊM SẢN PHẨM
          </Button>
        </Box>
      </Container>

      {/* Best Seller Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold">
            BÁN CHẠY NHẤT
          </Typography>
          <Box>
            <IconButton>
              <ArrowBack />
            </IconButton>
            <IconButton>
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {bestSellerProducts.map((product) => (
            <Box key={product.id} sx={{ flex: "1 1 300px", minWidth: 280 }}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: "#4caf50", borderColor: "#4caf50" }}
          >
            XEM THÊM SẢN PHẨM
          </Button>
        </Box>
      </Container>

      {/* Materials Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          NGUYÊN LIỆU
        </Typography>
        <Box sx={{ height: 200, bgcolor: "#e8f5e8", borderRadius: 2, mb: 3 }} />
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: "#4caf50", borderColor: "#4caf50" }}
          >
            XEM THÊM SẢN PHẨM
          </Button>
        </Box>
      </Container>

      {/* Sustainability Info */}
      <Box sx={{ bgcolor: "#2e7d32", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Hướng tới Thời trang Bền vững
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                Ngành thời trang là ngành ô nhiễm lớn thứ 2 trên thế giới, do đó
                chúng tôi cam kết tạo ra những sản phẩm thời trang bền vững,
                giảm thiểu tác động tiêu cực đến môi trường.
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Sử dụng 100% chất liệu tái chế và hữu cơ
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Quy trình sản xuất thân thiện với môi trường
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Hỗ trợ cộng đồng địa phương
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "#2e7d32",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                Tìm hiểu thêm
              </Button>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  height: 300,
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">Sustainability Image</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "#1a4d3a", color: "white", py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Tham Gia Vào EcoFashion
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Hãy cùng chúng tôi xây dựng một tương lai bền vững cho ngành thời
              trang
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to={user ? "/dashboard" : "/register"}
                sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#388e3c" } }}
              >
                {user ? "Bắt đầu bán" : "Bắt đầu bán - Đăng ký ngay"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/about"
                sx={{ borderColor: "white", color: "white" }}
              >
                Về chúng tôi
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
