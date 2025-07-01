import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/user/AuthContext";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PaletteIcon from "@mui/icons-material/Palette";
import {
  applicationService,
  type ApplyDesignerRequest,
} from "../../services/api/applicationService";

// Validation schema
const validationSchema = Yup.object({
  portfolioUrl: Yup.string()
    .url("Portfolio URL không hợp lệ")
    .required("Portfolio URL là bắt buộc"),
  bannerUrl: Yup.string().url("Banner URL không hợp lệ"),
  specializationUrl: Yup.string().url("Specialization URL không hợp lệ"),
  identificationNumber: Yup.string()
    .required("Số CMND/CCCD là bắt buộc")
    .matches(/^[0-9]{9,12}$/, "Số CMND/CCCD phải có 9-12 chữ số"),
  identificationPicture: Yup.string()
    .url("URL ảnh CMND/CCCD không hợp lệ")
    .required("Ảnh CMND/CCCD là bắt buộc"),
  note: Yup.string().max(500, "Ghi chú không được quá 500 ký tự"),
});

interface ApplyDesignerFormValues {
  portfolioUrl: string;
  bannerUrl: string;
  specializationUrl: string;
  identificationNumber: string;
  identificationPicture: string;
  note: string;
}

export default function ApplyDesigner() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues: ApplyDesignerFormValues = {
    portfolioUrl: "",
    bannerUrl: "",
    specializationUrl: "",
    identificationNumber: "",
    identificationPicture: "",
    note: "",
  };

  const handleSubmit = async (values: ApplyDesignerFormValues) => {
    try {
      setLoading(true);

      // Prepare request data
      const requestData: ApplyDesignerRequest = {
        portfolioUrl: values.portfolioUrl,
        bannerUrl: values.bannerUrl || undefined,
        specializationUrl: values.specializationUrl || undefined,
        identificationNumber: values.identificationNumber,
        identificationPicture: values.identificationPicture,
        note: values.note || undefined,
      };

      // Call API to submit application
      await applicationService.applyAsDesigner(requestData);

      toast.success("Đơn đăng ký Designer đã được gửi thành công!", {
        position: "top-center",
      });

      // Navigate to my applications page to see status
      navigate("/my-applications");
    } catch (error: any) {
      console.error("Error applying as designer:", error);
      toast.error(error.message || "Có lỗi xảy ra khi gửi đơn đăng ký", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in and is customer
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">
          Bạn cần đăng nhập để đăng ký làm Designer.
        </Alert>
      </Container>
    );
  }

  if (
    user.role?.toLowerCase() !== "customer" &&
    user.role?.toLowerCase() !== "user"
  ) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info">
          Chỉ có tài khoản Customer mới có thể đăng ký làm Designer.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <PaletteIcon sx={{ fontSize: 48, color: "#4caf50", mb: 2 }} />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Đăng ký làm Designer
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Chia sẻ tài năng thiết kế của bạn với cộng đồng EcoFashion
            </Typography>
            <Divider />
          </Box>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* Portfolio URL */}
                  <TextField
                    fullWidth
                    name="portfolioUrl"
                    label="Portfolio URL *"
                    placeholder="https://your-portfolio.com"
                    value={values.portfolioUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.portfolioUrl && Boolean(errors.portfolioUrl)}
                    helperText={touched.portfolioUrl && errors.portfolioUrl}
                  />

                  {/* Banner URL */}
                  <TextField
                    fullWidth
                    name="bannerUrl"
                    label="Banner URL"
                    placeholder="https://your-banner-image.com"
                    value={values.bannerUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.bannerUrl && Boolean(errors.bannerUrl)}
                    helperText={touched.bannerUrl && errors.bannerUrl}
                  />

                  {/* Specialization URL */}
                  <TextField
                    fullWidth
                    name="specializationUrl"
                    label="Specialization URL"
                    placeholder="https://your-specialization.com"
                    value={values.specializationUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.specializationUrl &&
                      Boolean(errors.specializationUrl)
                    }
                    helperText={
                      touched.specializationUrl && errors.specializationUrl
                    }
                  />

                  {/* Identification Number */}
                  <TextField
                    fullWidth
                    name="identificationNumber"
                    label="Số CMND/CCCD *"
                    placeholder="Nhập số CMND/CCCD"
                    value={values.identificationNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.identificationNumber &&
                      Boolean(errors.identificationNumber)
                    }
                    helperText={
                      touched.identificationNumber &&
                      errors.identificationNumber
                    }
                  />

                  {/* Identification Picture */}
                  <TextField
                    fullWidth
                    name="identificationPicture"
                    label="URL ảnh CMND/CCCD *"
                    placeholder="https://your-id-picture.com"
                    value={values.identificationPicture}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.identificationPicture &&
                      Boolean(errors.identificationPicture)
                    }
                    helperText={
                      touched.identificationPicture &&
                      errors.identificationPicture
                    }
                  />

                  {/* Note */}
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="note"
                    label="Ghi chú"
                    placeholder="Chia sẻ về kinh nghiệm, phong cách thiết kế..."
                    value={values.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.note && Boolean(errors.note)}
                    helperText={touched.note && errors.note}
                  />

                  {/* Submit Button */}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{
                        bgcolor: "#4caf50",
                        "&:hover": { bgcolor: "#388e3c" },
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          Đang gửi đơn...
                        </>
                      ) : (
                        "Gửi đơn đăng ký"
                      )}
                    </Button>
                  </Box>

                  {/* Info */}
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Lưu ý:</strong> Đơn đăng ký của bạn sẽ được Admin
                      xem xét và phê duyệt. Bạn sẽ nhận được thông báo khi đơn
                      được xử lý.
                    </Typography>
                  </Alert>
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
}
