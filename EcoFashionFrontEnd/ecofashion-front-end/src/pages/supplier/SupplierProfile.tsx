// Utility function to fallback image URL safely
function safeImageUrl(
  url?: string,
  fallback: string = "/assets/default-image.jpg"
): string {
  return typeof url === "string" && url.trim() ? url : fallback;
}
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Grid,
  Rating,
  IconButton,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  SupplierService,
  type SupplierModel,
} from "../../services/api/supplierService";
import { toast } from "react-toastify";
import {
  Business,
  Language,
  Email,
  Phone,
  LocationOn,
  Inventory,
  Verified,
  Edit,
  Save,
  Cancel,
} from "@mui/icons-material";
import { EcoIcon } from "../../assets/icons/icon";
import logo from "../../assets/pictures/homepage/logo.png";

export default function SupplierProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supplierData, setSupplierData] = useState<SupplierModel | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load supplier data from API
  useEffect(() => {
    const loadSupplierProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await SupplierService.getSupplierProfile();
        setSupplierData(data);
      } catch (error: any) {
        const errorMessage =
          error.message || "Không thể tải thông tin Supplier Profile";
        setError(errorMessage);
        toast.error(errorMessage, { position: "bottom-center" });
      } finally {
        setLoading(false);
      }
    };

    loadSupplierProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // TODO: Implement save logic
    setIsEditing(false);
    toast.success("Cập nhật profile thành công!", {
      position: "bottom-center",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset form data
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Đang tải thông tin Supplier Profile...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error || !supplierData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error ||
            "Không tìm thấy thông tin Supplier Profile. Vui lòng liên hệ admin để được hỗ trợ."}
        </Alert>

        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Business sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Chưa có thông tin Supplier
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Bạn cần được admin thiết lập profile Supplier để sử dụng tính năng
            này.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Banner Section */}
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${safeImageUrl(
            supplierData.bannerUrl,
            "/assets/default-banner.jpg"
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", pb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
            <Avatar
              sx={{ width: 80, height: 80, mr: 3, bgcolor: "#4caf50" }}
              src={safeImageUrl(
                supplierData.avatarUrl,
                "/assets/default-avatar.png"
              )}
              imgProps={{
                onError: (e: any) => {
                  if (
                    e.currentTarget.src !==
                    window.location.origin + "/assets/default-avatar.png"
                  ) {
                    e.currentTarget.src = "/assets/default-avatar.png";
                  }
                },
              }}
            >
              {!supplierData.avatarUrl
                ? supplierData.supplierName?.charAt(0)
                : null}
            </Avatar>
            <Box sx={{ color: "white", flex: 1 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {supplierData.supplierName ||
                  supplierData.user?.fullName ||
                  "Nhà cung cấp"}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Chip
                  label="Nhà Cung Cấp"
                  size="small"
                  sx={{
                    bgcolor: "rgba(33, 150, 243, 0.9)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
                <Chip
                  label={`Thành viên từ ${new Date(
                    supplierData.createdAt
                  ).getFullYear()}`}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: "white", color: "white" }}
                />
                <Rating
                  value={supplierData.rating || 0}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography variant="body2">
                  {supplierData.rating?.toFixed(1) || "0"} (
                  {supplierData.reviewCount || 0} đánh giá)
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              {!isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  sx={{
                    bgcolor: "rgba(76, 175, 80, 0.9)",
                    "&:hover": { bgcolor: "rgba(76, 175, 80, 1)" },
                  }}
                >
                  Chỉnh sửa
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    sx={{
                      bgcolor: "rgba(76, 175, 80, 0.9)",
                      "&:hover": { bgcolor: "rgba(76, 175, 80, 1)" },
                    }}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    sx={{
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Hủy
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Main Info */}
          <Grid>
            {/* Bio Section */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Business sx={{ mr: 1, color: "#2196f3" }} />
                  Giới thiệu
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                  {supplierData.bio ||
                    "Nhà cung cấp chuyên nghiệp với nhiều năm kinh nghiệm trong lĩnh vực cung cấp nguyên liệu và dịch vụ chất lượng cao."}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Chip
                    icon={<EcoIcon />}
                    label="Nguyên liệu bền vững"
                    size="small"
                    variant="outlined"
                    color="success"
                  />
                  <Chip
                    icon={<Inventory />}
                    label="Chất lượng cao"
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    icon={<Verified />}
                    label="Uy tín"
                    size="small"
                    variant="outlined"
                    color="info"
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Portfolio Section */}
            {supplierData.portfolioUrl && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Portfolio
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Language />}
                    href={supplierData.portfolioUrl}
                    target="_blank"
                    sx={{ mt: 1 }}
                  >
                    Xem Portfolio
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Specialization Section */}
            {supplierData.specializationUrl && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Chuyên môn
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Language />}
                    href={supplierData.specializationUrl}
                    target="_blank"
                    sx={{ mt: 1 }}
                  >
                    Xem chuyên môn
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Certificates Section */}
            {supplierData.certificates && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Chứng chỉ & Giải thưởng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {supplierData.certificates}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Right Column - Contact & Business Info */}
          <Grid>
            {/* Contact Info */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Thông tin liên hệ
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {supplierData.email && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Email sx={{ mr: 2, color: "#666" }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {supplierData.email}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {supplierData.phoneNumber && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Phone sx={{ mr: 2, color: "#666" }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Số điện thoại
                      </Typography>
                      <Typography variant="body1">
                        {supplierData.phoneNumber}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {supplierData.address && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOn sx={{ mr: 2, color: "#666" }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Địa chỉ
                      </Typography>
                      <Typography variant="body1">
                        {supplierData.address}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Business Info */}
            {(supplierData.taxNumber || supplierData.identificationNumber) && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Thông tin doanh nghiệp
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {supplierData.taxNumber && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Mã số thuế
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {supplierData.taxNumber}
                      </Typography>
                    </Box>
                  )}
                  {supplierData.identificationNumber && (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Số CMND/CCCD
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {supplierData.identificationNumber}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Identity Images */}
            {(supplierData.identificationPictureFront ||
              supplierData.identificationPictureBack) && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Xác minh danh tính
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 2, textAlign: "center" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Ảnh CMND/CCCD (Mặt trước)
                    </Typography>
                    {supplierData.identificationPictureFront ? (
                      <img
                        src={safeImageUrl(
                          supplierData.identificationPictureFront,
                          "/assets/default-cccd-front.jpg"
                        )}
                        alt="CMND/CCCD mặt trước"
                        style={{
                          maxWidth: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        onError={(e) => {
                          if (
                            e.currentTarget.src !==
                            window.location.origin +
                              "/assets/default-cccd-front.jpg"
                          ) {
                            e.currentTarget.src =
                              "/assets/default-cccd-front.jpg";
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Chưa tải lên
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Ảnh CMND/CCCD (Mặt sau)
                    </Typography>
                    {supplierData.identificationPictureBack ? (
                      <img
                        src={safeImageUrl(
                          supplierData.identificationPictureBack,
                          "/assets/default-cccd-back.jpg"
                        )}
                        alt="CMND/CCCD mặt sau"
                        style={{
                          maxWidth: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        onError={(e) => {
                          if (
                            e.currentTarget.src !==
                            window.location.origin +
                              "/assets/default-cccd-back.jpg"
                          ) {
                            e.currentTarget.src =
                              "/assets/default-cccd-back.jpg";
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Chưa tải lên
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Thống kê
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Đánh giá trung bình
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {supplierData.rating?.toFixed(1) || "0"}/5
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Tổng đánh giá
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {supplierData.reviewCount || 0}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Trạng thái
                  </Typography>
                  <Chip
                    label={supplierData.status || "Active"}
                    size="small"
                    color={
                      supplierData.status === "Active" ? "success" : "default"
                    }
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Thành viên từ
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {new Date(supplierData.createdAt).getFullYear()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
