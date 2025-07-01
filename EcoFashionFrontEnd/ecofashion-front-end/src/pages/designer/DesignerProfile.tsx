import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  TextField,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../../services/user/AuthContext";
import { useDesignerProfile } from "../../hooks/useDesignerProfile";
import type { DesignerProfile as DesignerProfileType } from "../../services/api";
import {
  Edit,
  Save,
  Cancel,
  Phone,
  Email,
  LocationOn,
  Business,
  Badge,
  Image,
  Work,
  Palette,
} from "@mui/icons-material";

export default function DesignerProfile() {
  const { user } = useAuth();
  const { profile, loading, saving, error, updateProfile } =
    useDesignerProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<DesignerProfileType>>({});

  // Update formData when profile changes
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = (
    field: keyof DesignerProfileType,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setIsEditing(false);
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
            Đang tải thông tin profile...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!profile && !loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error || "Không tìm thấy thông tin Designer Profile"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.role !== "designer"
              ? "Bạn cần có quyền Designer để xem trang này"
              : "Vui lòng liên hệ admin để tạo profile Designer"}
          </Typography>
        </Box>
      </Container>
    );
  }

  // Don't render main content if profile is null
  if (!profile) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Designer Profile
          </Typography>
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setIsEditing(true)}
              sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#388e3c" } }}
            >
              Chỉnh sửa
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={saving ? <CircularProgress size={16} /> : <Save />}
                onClick={handleSave}
                disabled={saving}
                sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#388e3c" } }}
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
                disabled={saving}
              >
                Hủy
              </Button>
            </Box>
          )}
        </Box>
        <Chip
          label={`Trạng thái: ${profile.status || "Chưa xác định"}`}
          color={profile.status === "Active" ? "success" : "default"}
          variant="outlined"
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Basic Information */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Badge sx={{ mr: 1, color: "#4caf50" }} />
              Thông tin cơ bản
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                sx={{ width: 80, height: 80, mr: 2, bgcolor: "#4caf50" }}
                src={profile.bannerUrl}
              >
                {profile.designerName?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6">{profile.designerName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Designer ID: {profile.designerId}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Tên Designer"
                  value={formData.designerName || ""}
                  onChange={(e) =>
                    handleInputChange("designerName", e.target.value)
                  }
                />
              ) : (
                <Typography variant="body1">
                  <strong>Tên:</strong> {profile.designerName}
                </Typography>
              )}

              {isEditing ? (
                <TextField
                  fullWidth
                  label="Portfolio URL"
                  value={formData.portfolioUrl || ""}
                  onChange={(e) =>
                    handleInputChange("portfolioUrl", e.target.value)
                  }
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Work sx={{ mr: 1, color: "#4caf50" }} />
                  <strong>Portfolio:</strong>&nbsp;
                  {profile.portfolioUrl ? (
                    <a
                      href={profile.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile.portfolioUrl}
                    </a>
                  ) : (
                    "Chưa cập nhật"
                  )}
                </Typography>
              )}

              {isEditing ? (
                <TextField
                  fullWidth
                  label="Specialization URL"
                  value={formData.specializationUrl || ""}
                  onChange={(e) =>
                    handleInputChange("specializationUrl", e.target.value)
                  }
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Palette sx={{ mr: 1, color: "#4caf50" }} />
                  <strong>Chuyên môn:</strong>&nbsp;
                  {profile.specializationUrl ? (
                    <a
                      href={profile.specializationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Xem chuyên môn
                    </a>
                  ) : (
                    "Chưa cập nhật"
                  )}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Email sx={{ mr: 1, color: "#4caf50" }} />
              Thông tin liên hệ
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Email sx={{ mr: 1, color: "#4caf50" }} />
                  <strong>Email:</strong>&nbsp;
                  {profile.email || "Chưa cập nhật"}
                </Typography>
              )}

              {isEditing ? (
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={formData.phoneNumber || ""}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Phone sx={{ mr: 1, color: "#4caf50" }} />
                  <strong>Điện thoại:</strong>&nbsp;
                  {profile.phoneNumber || "Chưa cập nhật"}
                </Typography>
              )}

              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Địa chỉ"
                  value={formData.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <LocationOn sx={{ mr: 1, color: "#4caf50", mt: 0.5 }} />
                  <Box>
                    <strong>Địa chỉ:</strong>
                    <br />
                    {profile.address || "Chưa cập nhật"}
                  </Box>
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Business sx={{ mr: 1, color: "#4caf50" }} />
              Thông tin kinh doanh
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="Mã số thuế"
                      value={formData.taxNumber || ""}
                      onChange={(e) =>
                        handleInputChange("taxNumber", e.target.value)
                      }
                    />
                  ) : (
                    <Typography variant="body1">
                      <strong>Mã số thuế:</strong>{" "}
                      {profile.taxNumber || "Chưa cập nhật"}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      label="Số CMND/CCCD"
                      value={formData.identificationNumber || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "identificationNumber",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <Typography variant="body1">
                      <strong>Số CMND/CCCD:</strong>{" "}
                      {profile.identificationNumber || "Chưa cập nhật"}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Image sx={{ mr: 1, color: "#4caf50" }} />
              Hồ sơ giấy tờ
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: 1, minWidth: 250 }}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Ảnh CMND/CCCD
                  </Typography>
                  {profile.identificationPicture ? (
                    <Box>
                      <img
                        src={profile.identificationPicture}
                        alt="CMND/CCCD"
                        style={{
                          maxWidth: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                      {isEditing && (
                        <TextField
                          fullWidth
                          label="URL ảnh CMND/CCCD"
                          value={formData.identificationPicture || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "identificationPicture",
                              e.target.value
                            )
                          }
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box sx={{ py: 4, color: "text.secondary" }}>
                      <Image sx={{ fontSize: 40 }} />
                      <Typography>Chưa tải lên</Typography>
                      {isEditing && (
                        <TextField
                          fullWidth
                          label="URL ảnh CMND/CCCD"
                          value={formData.identificationPicture || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "identificationPicture",
                              e.target.value
                            )
                          }
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  )}
                </Paper>
              </Box>

              <Box sx={{ flex: 1, minWidth: 250 }}>
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Ảnh chủ sở hữu
                  </Typography>
                  {profile.identificationPictureOwner ? (
                    <Box>
                      <img
                        src={profile.identificationPictureOwner}
                        alt="Chủ sở hữu"
                        style={{
                          maxWidth: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                      {isEditing && (
                        <TextField
                          fullWidth
                          label="URL ảnh chủ sở hữu"
                          value={formData.identificationPictureOwner || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "identificationPictureOwner",
                              e.target.value
                            )
                          }
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box sx={{ py: 4, color: "text.secondary" }}>
                      <Image sx={{ fontSize: 40 }} />
                      <Typography>Chưa tải lên</Typography>
                      {isEditing && (
                        <TextField
                          fullWidth
                          label="URL ảnh chủ sở hữu"
                          value={formData.identificationPictureOwner || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "identificationPictureOwner",
                              e.target.value
                            )
                          }
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  )}
                </Paper>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Lịch sử hoạt động
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="body2" color="text.secondary">
              <strong>Ngày tạo:</strong>{" "}
              {new Date(profile.createdAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            {profile.updatedAt && (
              <Typography variant="body2" color="text.secondary">
                <strong>Cập nhật lần cuối:</strong>{" "}
                {new Date(profile.updatedAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
