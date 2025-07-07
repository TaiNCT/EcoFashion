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
import BusinessIcon from "@mui/icons-material/Business";
import {
  applicationService,
  type ApplySupplierRequest,
} from "../../services/api/applicationService";

// Validation schema
const validationSchema = Yup.object({
  portfolioUrl: Yup.string().url("Portfolio URL không hợp lệ"),
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

interface ApplySupplierFormValues {
  portfolioUrl: string;
  bannerUrl: string;
  specializationUrl: string;
  identificationNumber: string;
  identificationPicture: string;
  note: string;
}

export default function ApplySupplier() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues: ApplySupplierFormValues = {
    portfolioUrl: "",
    bannerUrl: "",
    specializationUrl: "",
    identificationNumber: "",
    identificationPicture: "",
    note: "",
  };

  const handleSubmit = async (values: ApplySupplierFormValues) => {
    try {
      setLoading(true);

      // Prepare request data
      const requestData: ApplySupplierRequest = {
        portfolioUrl: values.portfolioUrl || undefined,
        bannerUrl: values.bannerUrl || undefined,
        specializationUrl: values.specializationUrl || undefined,
        identificationNumber: values.identificationNumber,
        identificationPicture: values.identificationPicture,
        note: values.note || undefined,
      };

      // Call API to submit application
      await applicationService.applyAsSupplier(requestData);

      toast.success("Đơn đăng ký Supplier đã được gửi thành công!", {
        position: "top-center",
      });

      // Navigate to my applications page to see status
      navigate("/my-applications");
    } catch (error: any) {
      console.error("Error applying as supplier:", error);
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
          Bạn cần đăng nhập để đăng ký làm Supplier.
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
          Chỉ có tài khoản Customer mới có thể đăng ký làm Supplier.
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
            <BusinessIcon sx={{ fontSize: 48, color: "#4caf50", mb: 2 }} />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Đăng ký làm Supplier
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Trở thành nhà cung cấp nguyên liệu bền vững cho EcoFashion
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
                    label="Company Portfolio URL"
                    placeholder="https://your-company.com"
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
                    label="Company Banner URL"
                    placeholder="https://your-company-banner.com"
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
                    label="Product Catalog URL"
                    placeholder="https://your-products.com"
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
                    label="Mã số thuế/CCCD *"
                    placeholder="Nhập mã số thuế hoặc CCCD"
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
                    label="URL giấy phép kinh doanh *"
                    placeholder="https://your-business-license.com"
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
                    label="Mô tả về công ty"
                    placeholder="Mô tả về sản phẩm, dịch vụ, kinh nghiệm..."
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
