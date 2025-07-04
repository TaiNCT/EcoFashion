import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Paper,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  ArrowForward,
  ArrowBack,
  Recycling,
  People,
} from "@mui/icons-material";
import ProductCard from "../components/products/ProductCard";
import ProductsSection from "../components/products/ProductsSection";
import MaterialsSection from "../components/materials/MaterialsSection";
import { useHomepage } from "../hooks/useHomepage";
import {
  featuredProducts,
  bestSellerProducts,
  stats,
} from "../data/homepageData";
import { materials } from "../data/materialsData";
import {
  getFeaturedProducts,
  getBestSellerProducts,
} from "../data/productsData";
import "./Homepage.css";

export default function Homepages() {
  const { user, getWelcomeMessage, handleSlideChange, handleAddToCart } =
    useHomepage();

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
            Các Sản Phẩm Thiết Kế Tái Chế Và Bền Vững
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
                  to="/signup"
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

      {/* Materials Section */}
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

      {/* Featured Products Section */}
      <ProductsSection
        products={getFeaturedProducts(4)} // Show first 4 featured products for homepage
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

      {/* Best Seller Section */}
      <ProductsSection
        products={getBestSellerProducts(4)} // Show first 4 best seller products for homepage
        title="SẢN PHẨM BÁN CHẠY"
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
          console.log("View more best seller products");
          // TODO: Navigate to best seller products page
        }}
      />

      {/* Role Dashboards Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="overline"
            sx={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "text.secondary",
              letterSpacing: 1.2,
            }}
          >
            Quick Access
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            fontWeight="bold"
            sx={{ mt: 1, mb: 2 }}
          >
            Role Dashboards
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "600px", mx: "auto" }}
          >
            Khám phá các góc nhìn khác nhau của nền tảng với quyền truy cập
            nhanh vào bảng điều khiển theo vai trò cụ thể
          </Typography>
        </Box>

        {/* Centered grid layout - giống format ban đầu */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            justifyItems: "center", // Căn giữa các grid items
            maxWidth: "1200px",
            mx: "auto", // Căn giữa toàn bộ grid container
          }}
        >
          {/* Designer Dashboard Card */}
          <Card
            sx={{
              width: "100%",
              maxWidth: 350,
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "white",
              borderRadius: 3,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ p: 4 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "rgba(255,255,255,0.2)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 7H6A2 2 0 0 0 4 9V18A2 2 0 0 0 6 20H15A2 2 0 0 0 17 18V17H20A2 2 0 0 0 22 15V6A2 2 0 0 0 20 4H11A2 2 0 0 0 9 6V7Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 13H13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 17H13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Bảng Điều Khiển Nhà Thiết Kế
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Tạo thiết kế bền vững, tìm nguồn nguyên liệu thân thiện với môi
                trường, và quản lý danh mục sản phẩm của bạn
              </Typography>
              <Button
                variant="text"
                component={Link}
                to="/designer/dashboard"
                sx={{
                  color: "white",
                  p: 0,
                  "&:hover": { bgcolor: "transparent" },
                }}
              >
                Truy Cập Bảng Điều Khiển →
              </Button>
            </Box>
          </Card>

          {/* Supplier Dashboard Card */}
          <Card
            sx={{
              width: "100%",
              maxWidth: 350,
              background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
              color: "white",
              borderRadius: 3,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ p: 4 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "rgba(255,255,255,0.2)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 8A2 2 0 0 0 19 6H15L13 4H5A2 2 0 0 0 3 6V18A2 2 0 0 0 5 20H19A2 2 0 0 0 21 18V8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 11H18"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 11H10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Bảng Điều Khiển Nhà Cung Cấp
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Giới thiệu nguyên liệu tái chế, kết nối với các nhà thiết kế, và
                quản lý hàng tồn kho của bạn
              </Typography>
              <Button
                variant="text"
                component={Link}
                to="/supplier/dashboard"
                sx={{
                  color: "white",
                  p: 0,
                  "&:hover": { bgcolor: "transparent" },
                }}
              >
                Truy Cập Bảng Điều Khiển →
              </Button>
            </Box>
          </Card>

          {/* Admin Dashboard Card */}
          <Card
            sx={{
              width: "100%",
              maxWidth: 350,
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              color: "white",
              borderRadius: 3,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ p: 4 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "rgba(255,255,255,0.2)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H21V21H3V3Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9H15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 13H15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 17H13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Bảng Điều Khiển Quản Trị Viên
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Quản lý người dùng nền tảng, đánh giá sản phẩm, và giám sát các
                chỉ số bền vững
              </Typography>
              <Button
                variant="text"
                component={Link}
                to="/admin/dashboard"
                sx={{
                  color: "white",
                  p: 0,
                  "&:hover": { bgcolor: "transparent" },
                }}
              >
                Truy Cập Bảng Điều Khiển →
              </Button>
            </Box>
          </Card>
        </Box>

        {/* Note and CTA */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4, fontStyle: "italic" }}
          >
            Lưu ý: Đây là các bảng điều khiển demo. Trong thực tế, cần có xác
            thực phù hợp.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/signup"
            endIcon={<ArrowForward />}
            sx={{
              color: "#4caf50",
              borderColor: "#4caf50",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: "1.1rem",
              fontWeight: 500,
              "&:hover": {
                borderColor: "#388e3c",
                bgcolor: "rgba(76, 175, 80, 0.04)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Tạo Tài Khoản Để Truy Cập Đầy Đủ
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
