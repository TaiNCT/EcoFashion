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
import { useHomepage } from "../hooks/useHomepage";
import { featuredProducts, bestSellerProducts, stats } from "../data/homepageData";
import "./Homepage.css";

export default function Homepages() {
  const { user, getWelcomeMessage, handleSlideChange, handleAddToCart } = useHomepage();
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
              onClick={() => handleSlideChange("prev", 3)}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={() => handleSlideChange("next", 3)}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {featuredProducts.map((product) => (
            <Box key={product.id} sx={{ flex: "1 1 300px", minWidth: 280 }}>
              <ProductCard 
                product={product} 
                isLoggedIn={!!user}
                onAddToCart={handleAddToCart}
              />
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
              <ProductCard 
                product={product} 
                isLoggedIn={!!user}
                onAddToCart={handleAddToCart}
              />
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
