import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../../services/user/AuthContext";
import {
  applicationService,
  type ApplicationModel,
} from "../../services/api/applicationService";
import { toast } from "react-toastify";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PaletteIcon from "@mui/icons-material/Palette";
import BusinessIcon from "@mui/icons-material/Business";

export default function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await applicationService.getMyApplications();
        setApplications(data);
      } catch (error: any) {
        console.error("Error fetching applications:", error);
        toast.error(error.message || "Lỗi khi tải danh sách đơn đăng ký", {
          position: "bottom-center",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <PendingIcon sx={{ color: "#ff9800" }} />;
      case "approved":
        return <CheckCircleIcon sx={{ color: "#4caf50" }} />;
      case "rejected":
        return <CancelIcon sx={{ color: "#f44336" }} />;
      default:
        return <PendingIcon sx={{ color: "#ff9800" }} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Đang chờ xét duyệt";
      case "approved":
        return "Đã phê duyệt";
      case "rejected":
        return "Đã từ chối";
      default:
        return "Không xác định";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getRoleIcon = (targetRoleId: number) => {
    return targetRoleId === 2 ? (
      <PaletteIcon sx={{ color: "#9c27b0" }} />
    ) : (
      <BusinessIcon sx={{ color: "#2196f3" }} />
    );
  };

  const getRoleName = (targetRoleId: number) => {
    return targetRoleId === 2 ? "Designer" : "Supplier";
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">Bạn cần đăng nhập để xem đơn đăng ký.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress size={40} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Đang tải danh sách đơn đăng ký...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <AssignmentIcon sx={{ fontSize: 48, color: "#1976d2", mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Đơn Đăng Ký Của Tôi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Theo dõi trạng thái các đơn đăng ký nâng cấp tài khoản
        </Typography>
      </Box>

      {/* Applications List */}
      {applications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <AssignmentIcon sx={{ fontSize: 64, color: "#bdbdbd", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Chưa có đơn đăng ký nào
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bạn chưa gửi đơn đăng ký nâng cấp tài khoản nào.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {applications.map((application) => (
            <Card
              key={application.applicationId}
              sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {getRoleIcon(application.targetRoleId)}
                    <Typography variant="h6" fontWeight="bold">
                      Đăng ký làm {getRoleName(application.targetRoleId)}
                    </Typography>
                  </Box>
                  <Chip
                    icon={getStatusIcon(application.status)}
                    label={getStatusText(application.status)}
                    color={getStatusColor(application.status) as any}
                    variant="outlined"
                  />
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Content */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    <Box sx={{ minWidth: 200 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Ngày gửi:</strong>
                      </Typography>
                      <Typography variant="body1">
                        {new Date(application.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </Typography>
                    </Box>

                    {application.processedAt && (
                      <Box sx={{ minWidth: 200 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Ngày xử lý:</strong>
                        </Typography>
                        <Typography variant="body1">
                          {new Date(application.processedAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </Typography>
                      </Box>
                    )}

                    {application.portfolioUrl && (
                      <Box sx={{ minWidth: 200 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Portfolio:</strong>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1976d2",
                            textDecoration: "underline",
                            cursor: "pointer",
                            wordBreak: "break-all",
                          }}
                          onClick={() =>
                            window.open(application.portfolioUrl, "_blank")
                          }
                        >
                          {application.portfolioUrl}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ minWidth: 200 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Số CMND/CCCD:</strong>
                      </Typography>
                      <Typography variant="body1">
                        {application.identificationNumber}
                      </Typography>
                    </Box>
                  </Box>

                  {application.note && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Ghi chú:</strong>
                      </Typography>
                      <Typography variant="body1">
                        {application.note}
                      </Typography>
                    </Box>
                  )}

                  {/* Rejection Reason */}
                  {application.status === "rejected" &&
                    application.rejectionReason && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          <strong>Lý do từ chối:</strong>
                        </Typography>
                        <Typography variant="body1">
                          {application.rejectionReason}
                        </Typography>
                      </Alert>
                    )}

                  {/* Success Message */}
                  {application.status === "approved" && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography variant="body1">
                        🎉 Chúc mừng! Đơn đăng ký của bạn đã được phê duyệt. Bạn
                        hiện đã là {getRoleName(application.targetRoleId)} và có
                        thể sử dụng các tính năng mới.
                      </Typography>
                    </Alert>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
