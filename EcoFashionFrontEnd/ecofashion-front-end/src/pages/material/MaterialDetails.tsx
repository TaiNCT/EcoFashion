import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Typography,
  CircularProgress,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import {
  ArrowBackIos,
  ArrowForwardIos,
  FavoriteBorder,
  Star,
  Recycling,
  LocalShipping,
} from "@mui/icons-material";
import { EcoIcon } from "../../assets/icons/icon";
import { materialService } from "../../services/api/materialService";
import type { MaterialDetailDto } from "../../types/Material";
import { DemoUtils } from "../../utils/DemoUtils";
import { toast } from "react-toastify";

export default function MaterialDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [materialDetail, setMaterialDetail] = useState<MaterialDetailDto | null>(null);
  const [relatedMaterials, setRelatedMaterials] = useState<MaterialDetailDto[]>([]);

  // UI State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch material detail
  useEffect(() => {
    if (!id) return;
    
    const fetchMaterialDetail = async () => {
      try {
        setLoading(true);
        const data = await materialService.getMaterialDetail(Number(id));
        const allMaterials = await materialService.getAllMaterials();
        
        setMaterialDetail({
          ...data,
          imageUrls: data.imageUrls ?? [],
        });
        // Get related materials (same type, different supplier)
        const related = allMaterials
          .filter(m => m.materialId !== Number(id) && m.materialTypeName === data.materialTypeName)
          .slice(0, 4);
        setRelatedMaterials(related);
      } catch (err: any) {
        const msg = err.message || "Không thể tải thông tin nguyên liệu.";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialDetail();
  }, [id]);

  // Image navigation
  const handlePrevImage = () => {
    const images = materialDetail?.imageUrls ?? [];
    if (!images || images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    const images = materialDetail?.imageUrls ?? [];
    if (!images || images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Tab handling
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Calculate sustainability score
  const getSustainabilityScore = (recycledPercentage: number) => {
    let score = recycledPercentage;
    if (recycledPercentage >= 80) score += 20;
    else if (recycledPercentage >= 50) score += 10;
    return Math.min(score, 100);
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error || !materialDetail) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          {error || "Không tìm thấy nguyên liệu."}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Về trang chủ
        </Button>
      </Box>
    );
  }

  const sustainabilityScore = getSustainabilityScore(materialDetail.recycledPercentage);
  const mainImage = materialDetail.imageUrls[currentImageIndex] || "/assets/default-material.jpg";

  return (
    <Box sx={{ width: "100%", bgcolor: "#f5f5f5" }}>
      {/* Breadcrumb */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang chủ
            </Link>
            <Link underline="hover" color="inherit" href="/materials">
              Nguyên liệu
            </Link>
            <Typography color="text.primary">{materialDetail.name}</Typography>
          </Breadcrumbs>
        </Box>
      </AppBar>

      <Box sx={{ mx: "auto", width: "80%", bgcolor: "#fff", minHeight: "100vh" }}>
        {/* Main Content */}
        <Box sx={{ py: 3, px: 4, display: "flex", gap: 4 }}>
          {/* Left: Images */}
          <Grid sx={{ width: "50%" }}>
            {/* Main Image with Navigation */}
            <Box sx={{ position: "relative", mb: 2 }}>
              <Box
                component="img"
                src={mainImage}
                alt={materialDetail.name || "Material"}
                sx={{
                  width: "100%",
                  height: "60vh",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
              {materialDetail.imageUrls.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 8,
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                    }}
                  >
                    <ArrowBackIos fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 8,
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                    }}
                  >
                    <ArrowForwardIos fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>

            {/* Thumbnail Images */}
            {materialDetail.imageUrls.length > 1 && (
              <Box sx={{ display: "flex", gap: 1 }}>
                {materialDetail.imageUrls.slice(0, 4).map((img, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)}
                    sx={{
                      width: "23%",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: 1,
                      cursor: "pointer",
                      border: index === currentImageIndex ? "2px solid #1976d2" : "1px solid #ccc",
                    }}
                  />
                ))}
              </Box>
            )}
          </Grid>

          {/* Right: Material Info */}
          <Grid sx={{ width: "50%" }}>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  {materialDetail.name || "Unnamed Material"}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Mã: M{materialDetail.materialId.toString().padStart(3, '0')}
                </Typography>
                <Chip
                  label={materialDetail.materialTypeName || "Unknown Type"}
                  color="primary"
                  size="small"
                  sx={{ mb: 1 }}
                />
              </Box>
              <IconButton onClick={() => setIsFavorite(!isFavorite)}>
                <FavoriteBorder 
                  sx={{ 
                    fontSize: 28,
                    color: isFavorite ? "#f44336" : "inherit"
                  }} 
                />
              </IconButton>
            </Box>

            {/* Supplier Info */}
            <Box sx={{ mb: 3, p: 2, bgcolor: "#f8f9fa", borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Nhà cung cấp
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={materialDetail.supplier.avatarUrl}
                  sx={{ width: 50, height: 50 }}
                >
                  {materialDetail.supplier.supplierName?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {materialDetail.supplier.supplierName}
                  </Typography>
                  {materialDetail.supplier.rating && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating 
                        value={materialDetail.supplier.rating} 
                        readOnly 
                        size="small" 
                      />
                      <Typography variant="body2">
                        ({materialDetail.supplier.reviewCount || 0} đánh giá)
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Price and Availability */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                {DemoUtils.formatPrice(materialDetail.pricePerUnit)}
              </Typography>
              <Chip
                label={materialDetail.quantityAvailable > 0 ? "Còn hàng" : "Hết hàng"}
                color={materialDetail.quantityAvailable > 0 ? "success" : "error"}
                icon={<LocalShipping />}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                Còn lại: {materialDetail.quantityAvailable} đơn vị
              </Typography>
            </Box>

            {/* Sustainability Score */}
            <Box sx={{ mb: 3, p: 2, bgcolor: "#e8f5e8", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Recycling color="success" />
                <Typography variant="h6" fontWeight="bold">
                  Điểm bền vững: {sustainabilityScore.toFixed(0)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={sustainabilityScore}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#c8e6c9",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#4caf50",
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {materialDetail.recycledPercentage.toFixed(1)}% tái chế
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
                disabled={materialDetail.quantityAvailable === 0}
              >
                Liên hệ nhà cung cấp
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => navigate(`/supplier/${materialDetail.supplier.supplierId}`)}
              >
                Xem hồ sơ
              </Button>
            </Box>
          </Grid>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ borderTop: "1px solid #e0e0e0" }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                fontWeight: "bold",
              },
            }}
          >
            <Tab label="Thông tin chi tiết" />
            <Tab label="Tính bền vững" />
            <Tab label="Đánh giá" />
            <Tab label="Tài liệu" />
          </Tabs>

          {/* Tab Content */}
          <Box sx={{ p: 4 }}>
            {/* Tab 1: Thông tin chi tiết */}
            {tabIndex === 0 && (
              <Grid container spacing={4}>
                <Grid >
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Mô tả
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {materialDetail.description || "Chưa có mô tả chi tiết."}
                  </Typography>

                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Thông số kỹ thuật
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Loại nguyên liệu" 
                        secondary={materialDetail.materialTypeName || "Chưa cập nhật"} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Tỷ lệ tái chế" 
                        secondary={`${materialDetail.recycledPercentage.toFixed(1)}%`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Giá trên đơn vị" 
                        secondary={DemoUtils.formatPrice(materialDetail.pricePerUnit)} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Ngày tạo" 
                        secondary={new Date(materialDetail.createdAt).toLocaleDateString('vi-VN')} 
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid >
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Tiêu chí bền vững
                  </Typography>
                  {materialDetail.sustainabilityCriteria.length > 0 ? (
                    <List dense>
                      {materialDetail.sustainabilityCriteria.map((criterion, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <Box sx={{ color: "success.main" }}>
                              <EcoIcon />
                            </Box>
                          </ListItemIcon>
                          <ListItemText 
                            primary={criterion.name || `Tiêu chí ${index + 1}`}
                            secondary={`${criterion.value} ${criterion.unit || ''}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Chưa có thông tin tiêu chí bền vững.
                    </Typography>
                  )}
                </Grid>
              </Grid>
            )}

            {/* Tab 2: Tính bền vững */}
            {tabIndex === 1 && (
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                  Thông tin bền vững
                </Typography>
                
                {materialDetail.benchmarks.length > 0 ? (
                  <Grid container spacing={3}>
                    {materialDetail.benchmarks.map((benchmark, index) => (
                      <Grid >
                        <Card>
                          <CardContent>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                              {benchmark.criterionName || `Benchmark ${index + 1}`}
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2">Giá trị thực tế:</Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {benchmark.actualValue}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2">Giá trị chuẩn:</Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {benchmark.benchmarkValue}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="body2">Cải thiện:</Typography>
                              <Typography 
                                variant="body2" 
                                fontWeight="bold"
                                color={benchmark.improvementPercentage > 0 ? "success.main" : "error.main"}
                              >
                                {benchmark.improvementPercentage > 0 ? '+' : ''}{benchmark.improvementPercentage.toFixed(1)}%
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Chưa có thông tin benchmark.
                  </Typography>
                )}
              </Box>
            )}

            {/* Tab 3: Đánh giá */}
            {tabIndex === 2 && (
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                  Đánh giá từ khách hàng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chưa có đánh giá cho nguyên liệu này.
                </Typography>
              </Box>
            )}

            {/* Tab 4: Tài liệu */}
            {tabIndex === 3 && (
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                  Tài liệu liên quan
                </Typography>
                {materialDetail.documentationUrl ? (
                  <Button 
                    variant="contained" 
                    href={materialDetail.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Xem tài liệu kỹ thuật
                  </Button>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Chưa có tài liệu đính kèm.
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>

        {/* Related Materials */}
        {relatedMaterials.length > 0 && (
          <Box sx={{ p: 4, borderTop: "1px solid #e0e0e0" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Nguyên liệu tương tự
            </Typography>
            <Grid container spacing={3}>
              {relatedMaterials.map((material) => (
                <Grid key={material.materialId}>
                  <Card 
                    sx={{ 
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-4px)" }
                    }}
                    onClick={() => navigate(`/material/${material.materialId}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={material.imageUrls[0] || "/assets/default-material.jpg"}
                      alt={material.name || "Material"}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" noWrap>
                        {material.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {material.supplier.supplierName}
                      </Typography>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {DemoUtils.formatPrice(material.pricePerUnit)}
                      </Typography>
                      <Chip
                        label={`${material.recycledPercentage.toFixed(1)}% tái chế`}
                        size="small"
                        color="success"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}
