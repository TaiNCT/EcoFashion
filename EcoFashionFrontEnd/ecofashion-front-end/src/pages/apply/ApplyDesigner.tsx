import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  FormControl,
  FormGroup,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyDesignerSchema } from "../../schemas/applyDesignerSchema";
import { useAuth } from "../../services/user/AuthContext";
import { toast } from "react-toastify";
import FileUpload from "../../components/FileUpload";
import {
  Instagram,
  Facebook,
  Language,
  Phone,
  LocationOn,
  BusinessCenter,
} from "@mui/icons-material";
import PaletteIcon from "@mui/icons-material/Palette";
import { applicationService } from "../../services/api/applicationService";

const steps = [
  "Thông tin cơ bản",
  "Thông tin nghề nghiệp",
  "Portfolio & Media",
  "Thông tin định danh",
  "Xác nhận & Hoàn tất",
];

export default function ApplyDesigner() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(applyDesignerSchema),
    defaultValues: {
      socialLinks: "",
      agreedToTerms: false,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const watchAll = watch();

  const handleNext = async () => {
    // Validate only the current step fields
    const currentStepFields = getStepFields(activeStep);
    const valid = await trigger(currentStepFields as any);
    if (valid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Helper function to get fields for each step
  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 0: // Basic Info
        return ["phoneNumber", "address"];
      case 1: // Professional Info
        return ["bio", "certificates", "specializationUrl", "taxNumber"];
      case 2: // Portfolio & Media
        return [
          "avatarFile",
          "bannerFile",
          "portfolioUrl",
          "portfolioFiles",
          "socialLinks",
        ];
      case 3: // Identity Verification
        return [
          "identificationNumber",
          "identificationPictureFront",
          "identificationPictureBack",
        ];
      case 4: // Agreement
        return ["note", "agreedToTerms"];
      default:
        return [];
    }
  };

  const onSubmit = async (data) => {
    // Debug: Log request
    console.log("🚀 Sending request:", {
      avatarFile: data.avatarFile?.[0]?.name,
      bannerFile: data.bannerFile?.[0]?.name,
      identificationPictureFront: data.identificationPictureFront?.[0]?.name,
      identificationPictureBack: data.identificationPictureBack?.[0]?.name,
      portfolioFiles: data.portfolioFiles?.map((f) => f.name),
    });

    try {
      setLoading(true);
      toast.info("Đang xử lý đơn đăng ký...");
      const result = await applicationService.applyAsDesigner(data);

      // Debug: Log received response
      console.log("✅ Received response:", {
        avatarUrl: result.avatarUrl,
        bannerUrl: result.bannerUrl,
        identificationPictureFront: result.identificationPictureFront,
        identificationPictureBack: result.identificationPictureBack,
      });

      toast.success("Gửi đơn thành công!");
      navigate("/my-applications");
    } catch (err) {
      console.error("❌ Error submitting application:", err);
      toast.error("Có lỗi xảy ra khi gửi đơn.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Basic Info
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Thông tin cơ bản
            </Typography>

            {/* Display user info from claims */}
            <Alert severity="info">
              <Typography variant="body2">
                <strong>Email:</strong> {user?.email}
              </Typography>
              <Typography variant="body2">
                <strong>Họ và tên:</strong> {user?.fullName}
              </Typography>
            </Alert>

            <TextField
              fullWidth
              label="Số điện thoại *"
              {...register("phoneNumber")}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Địa chỉ *"
              {...register("address")}
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );

      case 1: // Professional Info
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Thông tin nghề nghiệp
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mô tả về bản thân"
              {...register("bio")}
              error={Boolean(errors.bio)}
              helperText={errors.bio?.message}
            />

            <TextField
              fullWidth
              label="Chứng chỉ/Giải thưởng"
              {...register("certificates")}
              error={Boolean(errors.certificates)}
              helperText={errors.certificates?.message}
            />

            <TextField
              fullWidth
              label="URL chuyên môn"
              placeholder="https://www.ecofation-example.com"
              {...register("specializationUrl")}
              error={Boolean(errors.specializationUrl)}
              helperText={errors.specializationUrl?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Mã số thuế"
              {...register("taxNumber")}
              error={Boolean(errors.taxNumber)}
              helperText={errors.taxNumber?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessCenter color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );

      case 2: // Portfolio & Media
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Portfolio & Hình ảnh
            </Typography>

            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ảnh đại diện
              </Typography>
              <Controller
                name="avatarFile"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    label="Chọn ảnh đại diện"
                    files={field.value ? [field.value] : []}
                    onFilesChange={(files) => field.onChange(files)}
                    accept="image/*"
                    maxSize={5}
                    error={errors.avatarFile?.message as string}
                  />
                )}
              />
            </Paper>

            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ảnh banner
              </Typography>
              <Controller
                name="bannerFile"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    label="Chọn ảnh banner"
                    files={field.value ? [field.value] : []}
                    onFilesChange={(files) => field.onChange(files)}
                    accept="image/*"
                    maxSize={10}
                  />
                )}
              />
            </Paper>

            <TextField
              fullWidth
              label="Portfolio URL"
              placeholder="https://www.ecofation-example.com"
              {...register("portfolioUrl")}
              error={Boolean(errors.portfolioUrl)}
              helperText={errors.portfolioUrl?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Portfolio Files
              </Typography>
              <Controller
                name="portfolioFiles"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    label="Chọn ảnh portfolio"
                    multiple
                    files={field.value || []}
                    onFilesChange={(files) => field.onChange(files)}
                    accept="image/*"
                    maxSize={5}
                  />
                )}
              />
            </Paper>

            <TextField
              fullWidth
              label="Liên kết mạng xã hội (JSON)"
              {...register("socialLinks")}
              error={Boolean(errors.socialLinks)}
              helperText={errors.socialLinks?.message}
            />
          </Box>
        );

      case 3: // Identity Verification
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Thông tin định danh
            </Typography>

            <TextField
              fullWidth
              label="Số CCCD/CMND *"
              {...register("identificationNumber")}
              error={Boolean(errors.identificationNumber)}
              helperText={errors.identificationNumber?.message}
            />

            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ảnh CCCD mặt trước
              </Typography>
              <Controller
                name="identificationPictureFront"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    label="Chọn ảnh mặt trước"
                    files={field.value ? [field.value] : []}
                    onFilesChange={(files) => field.onChange(files)}
                    accept="image/*"
                    maxSize={5}
                    error={errors.identificationPictureFront?.message as string}
                  />
                )}
              />
            </Paper>

            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ảnh CCCD mặt sau
              </Typography>
              <Controller
                name="identificationPictureBack"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    label="Chọn ảnh mặt sau"
                    files={field.value ? [field.value] : []}
                    onFilesChange={(files) => field.onChange(files)}
                    accept="image/*"
                    maxSize={5}
                    error={errors.identificationPictureBack?.message as string}
                  />
                )}
              />
            </Paper>
          </Box>
        );

      case 4: // Agreement & Completion
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Alert severity="success">
              Bạn đã hoàn thành các bước đăng ký! Vui lòng xem lại thông tin và
              xác nhận.
            </Alert>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Ghi chú"
              {...register("note")}
              error={Boolean(errors.note)}
              helperText={errors.note?.message}
            />

            <FormControl error={Boolean(errors.agreedToTerms)}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...register("agreedToTerms")} />}
                  label="Tôi đồng ý với các điều khoản và điều kiện"
                />
                {errors.agreedToTerms && (
                  <Typography variant="caption" color="error">
                    {errors.agreedToTerms?.message}
                  </Typography>
                )}
              </FormGroup>
            </FormControl>
          </Box>
        );

      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <PaletteIcon sx={{ fontSize: 48, color: "#4caf50" }} />
            <Typography variant="h4" fontWeight="bold">
              Đăng ký Nhà Thiết Kế
            </Typography>
            <Typography color="text.secondary">
              Tham gia cộng đồng những nhà thiết kế thời trang bền vững
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Quay lại
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                Gửi đơn đăng ký
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Tiếp theo
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
