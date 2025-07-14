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
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  InputAdornment,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/user/AuthContext";
import { toast } from "react-toastify";
import BusinessIcon from "@mui/icons-material/Business";
import {
  Instagram,
  Facebook,
  Language,
  Phone,
  Email,
  LocationOn,
  BusinessCenter,
  Factory,
} from "@mui/icons-material";
import {
  applicationService,
  type ApplySupplierRequest,
} from "../../services/api/applicationService";
import FileUpload from "../../components/FileUpload";

// Steps - Updated to 5 steps
const steps = [
  "Thông tin cơ bản",
  "Thông tin doanh nghiệp",
  "Portfolio & Media",
  "Thông tin định danh",
  "Xác nhận & Hoàn tất",
];

interface FormData {
  // Step 1: Basic Info
  supplierName: string;
  email: string;
  phoneNumber: string;
  address: string;

  // Step 2: Business Info
  businessType: string;
  taxNumber: string;
  bio: string;
  experience: string;

  // Step 3: Portfolio & Media
  portfolioUrl: string;
  bannerUrl: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    website: string;
    linkedin: string;
  };
  avatarFile: File[];
  bannerFile: File[];
  portfolioFiles: File[];

  // Step 4: Identity Verification
  identificationType: "cccd" | "cmnd";
  identificationNumber: string;
  fullName: string;
  identificationPictureFile: File[];

  // Step 5: Agreement
  agreedToTerms: boolean;
  note: string;
}

export default function ApplySupplier() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submission tracking
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    // Step 1
    supplierName: "",
    email: user?.email || "",
    phoneNumber: "",
    address: "",

    // Step 2
    businessType: "",
    taxNumber: "",
    bio: "",
    experience: "",

    // Step 3
    portfolioUrl: "",
    bannerUrl: "",
    socialLinks: {
      instagram: "",
      facebook: "",
      website: "",
      linkedin: "",
    },
    avatarFile: [],
    bannerFile: [],
    portfolioFiles: [],

    // Step 4
    identificationType: "cccd",
    identificationNumber: "",
    fullName: user?.fullName || "",
    identificationPictureFile: [],

    // Step 5
    agreedToTerms: false,
    note: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    switch (step) {
      case 0: // Basic Info
        if (!formData.supplierName.trim())
          newErrors.supplierName = "Tên công ty là bắt buộc";
        if (!formData.email.trim()) newErrors.email = "Email là bắt buộc";
        if (!formData.phoneNumber.trim())
          newErrors.phoneNumber = "Số điện thoại là bắt buộc";
        if (!formData.address.trim()) newErrors.address = "Địa chỉ là bắt buộc";
        break;

      case 1: // Business Info
        if (!formData.bio.trim())
          newErrors.bio = "Mô tả về công ty là bắt buộc";
        if (!formData.businessType.trim())
          newErrors.businessType = "Loại hình kinh doanh là bắt buộc";
        break;

      case 2: // Portfolio & Media
        if (formData.avatarFile.length === 0) {
          newErrors.avatarFile = "Vui lòng chọn logo công ty" as any;
        }
        break;

      case 3: // Identity Verification
        if (!formData.identificationNumber.trim())
          newErrors.identificationNumber = "Số CCCD/CMND là bắt buộc";
        if (!formData.fullName.trim())
          newErrors.fullName = "Họ và tên là bắt buộc";
        if (formData.identificationPictureFile.length === 0) {
          newErrors.identificationPictureFile =
            "Vui lòng chọn ảnh CCCD/CMND" as any;
        }
        break;

      case 4: // Agreement
        if (!formData.agreedToTerms)
          newErrors.agreedToTerms = "Bạn phải đồng ý với điều khoản" as any;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    // Prevent double submission
    if (isSubmitting) {
      toast.warning("Đơn đăng ký đang được xử lý, vui lòng đợi...", {
        position: "top-center",
      });
      return;
    }

    try {
      setLoading(true);
      setIsSubmitting(true);

      // Prepare social links JSON
      const socialLinksJson = JSON.stringify(formData.socialLinks);

      // Prepare request data
      const requestData: ApplySupplierRequest = {
        avatarFile: formData.avatarFile[0],
        bannerFile: formData.bannerFile[0],
        portfolioUrl: formData.portfolioUrl || undefined,
        portfolioFiles: formData.portfolioFiles,
        bannerUrl: formData.bannerUrl || undefined,
        specializationUrl: formData.socialLinks.website || undefined,
        socialLinks: socialLinksJson,
        identificationNumber: formData.identificationNumber,
        identificationPictureFile: formData.identificationPictureFile[0],
        note: formData.note || undefined,
      };

      await applicationService.applyAsSupplier(requestData);

      toast.success("Đơn đăng ký Supplier đã được gửi thành công!", {
        position: "top-center",
      });

      navigate("/my-applications");
    } catch (error: any) {
      console.error("Error applying as supplier:", error);
      toast.error(error.message || "Có lỗi xảy ra khi gửi đơn đăng ký", {
        position: "bottom-center",
      });
      setIsSubmitting(false); // Reset submission state on error
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const updateSocialLinks = (
    platform: keyof FormData["socialLinks"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
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

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Basic Info
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Thông tin cơ bản của công ty
            </Typography>

            <TextField
              fullWidth
              label="Tên Công ty *"
              placeholder="Nhập tên công ty của bạn"
              value={formData.supplierName}
              onChange={(e) => updateFormData("supplierName", e.target.value)}
              error={Boolean(errors.supplierName)}
              helperText={
                errors.supplierName ||
                `${formData.supplierName.length}/100 ký tự`
              }
              inputProps={{ maxLength: 100 }}
            />

            <TextField
              fullWidth
              label="Email *"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Số điện thoại *"
              placeholder="Nhập số điện thoại công ty"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData("phoneNumber", e.target.value)}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
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
              label="Địa chỉ công ty *"
              placeholder="Nhập địa chỉ trụ sở chính"
              value={formData.address}
              onChange={(e) => updateFormData("address", e.target.value)}
              error={Boolean(errors.address)}
              helperText={errors.address}
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

      case 1: // Business Info
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Thông tin doanh nghiệp
            </Typography>

            <TextField
              fullWidth
              label="Loại hình kinh doanh *"
              placeholder="VD: Sản xuất vải hữu cơ, Chế tạo phụ kiện, Tái chế nguyên liệu..."
              value={formData.businessType}
              onChange={(e) => updateFormData("businessType", e.target.value)}
              error={Boolean(errors.businessType)}
              helperText={errors.businessType}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Factory color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mô tả về công ty *"
              placeholder="Hãy mô tả về công ty, sản phẩm chính, và cam kết về tính bền vững..."
              value={formData.bio}
              onChange={(e) => updateFormData("bio", e.target.value)}
              error={Boolean(errors.bio)}
              helperText={errors.bio || `${formData.bio.length}/500 ký tự`}
              inputProps={{ maxLength: 500 }}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Kinh nghiệm trong ngành"
              placeholder="Mô tả về kinh nghiệm, các dự án đã thực hiện, khách hàng lớn..."
              value={formData.experience}
              onChange={(e) => updateFormData("experience", e.target.value)}
              helperText={`${formData.experience.length}/300 ký tự`}
              inputProps={{ maxLength: 300 }}
            />

            <TextField
              fullWidth
              label="Mã số thuế"
              placeholder="Nhập mã số thuế doanh nghiệp"
              value={formData.taxNumber}
              onChange={(e) => updateFormData("taxNumber", e.target.value)}
              helperText="Mã số thuế doanh nghiệp (bắt buộc đối với công ty)"
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

            {/* Logo Upload */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Logo công ty *
              </Typography>
              <FileUpload
                label="Chọn logo công ty"
                files={formData.avatarFile}
                onFilesChange={(files) => updateFormData("avatarFile", files)}
                accept="image/*"
                maxSize={5}
                error={errors.avatarFile as string}
                helperText="Logo sẽ hiển thị trên profile công ty (tối đa 5MB)"
              />
            </Paper>

            {/* Banner Upload */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ảnh banner công ty
              </Typography>
              <FileUpload
                label="Chọn ảnh banner"
                files={formData.bannerFile}
                onFilesChange={(files) => updateFormData("bannerFile", files)}
                accept="image/*"
                maxSize={10}
                helperText="Ảnh banner lớn hiển thị ở đầu profile (tối đa 10MB)"
              />
            </Paper>

            {/* Portfolio Files */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Catalog sản phẩm
              </Typography>
              <FileUpload
                label="Chọn ảnh sản phẩm"
                multiple
                files={formData.portfolioFiles}
                onFilesChange={(files) =>
                  updateFormData("portfolioFiles", files)
                }
                accept="image/*"
                maxSize={5}
                helperText="Ảnh các sản phẩm/nguyên liệu mà công ty cung cấp (mỗi ảnh tối đa 5MB)"
              />
            </Paper>

            <TextField
              fullWidth
              label="Website Portfolio"
              placeholder="https://your-company.com"
              value={formData.portfolioUrl}
              onChange={(e) => updateFormData("portfolioUrl", e.target.value)}
              helperText="Link tới website chính thức của công ty"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Social Links */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Mạng xã hội (tùy chọn)
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Website"
                    placeholder="https://your-company.com"
                    value={formData.socialLinks.website}
                    onChange={(e) =>
                      updateSocialLinks("website", e.target.value)
                    }
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
                    label="LinkedIn"
                    placeholder="https://linkedin.com/company/your-company"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) =>
                      updateSocialLinks("linkedin", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Language color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Facebook"
                    placeholder="https://facebook.com/your-company"
                    value={formData.socialLinks.facebook}
                    onChange={(e) =>
                      updateSocialLinks("facebook", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Facebook color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Instagram"
                    placeholder="https://instagram.com/your-company"
                    value={formData.socialLinks.instagram}
                    onChange={(e) =>
                      updateSocialLinks("instagram", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Instagram color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        );

      case 3: // Identity Verification
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Alert severity="info">
              Vui lòng cung cấp thông tin định danh của người đại diện công ty.
            </Alert>

            <FormControl component="fieldset">
              <FormLabel component="legend">Hình thức định danh:</FormLabel>
              <RadioGroup
                value={formData.identificationType}
                onChange={(e) =>
                  updateFormData(
                    "identificationType",
                    e.target.value as "cccd" | "cmnd"
                  )
                }
                row
              >
                <FormControlLabel
                  value="cccd"
                  control={<Radio />}
                  label="Căn Cước Công Dân (CCCD)"
                />
                <FormControlLabel
                  value="cmnd"
                  control={<Radio />}
                  label="Chứng Minh Nhân Dân (CMND)"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              fullWidth
              label={`Số ${formData.identificationType.toUpperCase()} *`}
              value={formData.identificationNumber}
              onChange={(e) =>
                updateFormData("identificationNumber", e.target.value)
              }
              error={Boolean(errors.identificationNumber)}
              helperText={errors.identificationNumber}
              inputProps={{ maxLength: 12 }}
            />

            <TextField
              fullWidth
              label="Họ & Tên người đại diện *"
              placeholder="Họ và tên theo CCCD/CMND"
              value={formData.fullName}
              onChange={(e) => updateFormData("fullName", e.target.value)}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
            />

            {/* ID Picture Upload */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Hình chụp của thẻ {formData.identificationType.toUpperCase()} *
              </Typography>
              <FileUpload
                label={`Chọn ảnh ${formData.identificationType.toUpperCase()}`}
                files={formData.identificationPictureFile}
                onFilesChange={(files) =>
                  updateFormData("identificationPictureFile", files)
                }
                accept="image/*"
                maxSize={5}
                required
                error={errors.identificationPictureFile as string}
                helperText="Vui lòng chụp ảnh rõ ràng CCCD/CMND của người đại diện công ty"
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

            {/* Summary */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Tóm tắt thông tin
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Tên Công ty:
                    </Typography>
                    <Typography variant="body1">
                      {formData.supplierName}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Email:
                    </Typography>
                    <Typography variant="body1">{formData.email}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Loại hình:
                    </Typography>
                    <Typography variant="body1">
                      {formData.businessType}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Số {formData.identificationType.toUpperCase()}:
                    </Typography>
                    <Typography variant="body1">
                      {formData.identificationNumber}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Ghi chú (tùy chọn)"
              placeholder="Nhập thêm thông tin bạn muốn chia sẻ với EcoFashion..."
              value={formData.note}
              onChange={(e) => updateFormData("note", e.target.value)}
              helperText={`${formData.note.length}/500 ký tự`}
              inputProps={{ maxLength: 500 }}
            />

            <FormControl error={Boolean(errors.agreedToTerms)}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreedToTerms}
                      onChange={(e) =>
                        updateFormData("agreedToTerms", e.target.checked)
                      }
                    />
                  }
                  label="Tôi xác nhận tất cả dữ liệu đã cung cấp là chính xác và trung thực. Tôi đã đọc và đồng ý với Chính sách Bảo Mật của EcoFashion"
                />
                {errors.agreedToTerms && (
                  <Typography variant="caption" color="error">
                    {errors.agreedToTerms}
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
              Đăng ký Nhà Cung Cấp
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Trở thành đối tác cung cấp nguyên liệu bền vững cho EcoFashion
            </Typography>
            <Divider />
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          {renderStepContent(activeStep)}

          {/* Navigation Buttons */}
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
                onClick={handleSubmit}
                disabled={loading || isSubmitting}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting
                  ? "Đang xử lý..."
                  : loading
                  ? "Đang gửi..."
                  : "Gửi đơn đăng ký"}
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
