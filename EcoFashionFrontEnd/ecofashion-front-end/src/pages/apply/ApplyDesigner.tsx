import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/user/AuthContext";
import { toast } from "react-toastify";
import PaletteIcon from "@mui/icons-material/Palette";
import {
  Instagram,
  Facebook,
  LinkedIn,
  Language,
  Phone,
  Email,
  LocationOn,
  Business,
  BusinessCenter,
} from "@mui/icons-material";
import {
  applicationService,
  type ApplyDesignerRequest,
} from "../../services/api/applicationService";
import FileUpload from "../../components/FileUpload";

// Steps - Updated to 5 steps
const steps = [
  "Thông tin cơ bản",
  "Thông tin nghề nghiệp",
  "Portfolio & Media",
  "Thông tin định danh",
  "Xác nhận & Hoàn tất",
];

interface FormData {
  // Step 1: Basic Info
  designerName: string;
  email: string;
  phoneNumber: string;
  address: string;

  // Step 2: Professional Info
  specializationUrl: string;
  taxNumber: string;
  bio: string;
  experience: string;
  certificates: string;

  // Step 3: Portfolio & Media
  portfolioUrl: string;
  bannerUrl: string;
  socialLinks: {
    instagram: string;
    behance: string;
    facebook: string;
    website: string;
  };
  avatarFile: File[];
  bannerFile: File[];
  portfolioFiles: File[];

  // Step 4: Identity Verification
  identificationType: "cccd" | "cmnd";
  identificationNumber: string;
  fullName: string;
  identificationPictureFile: File[];
  identificationPictureOwner: string;

  // Step 5: Agreement
  agreedToTerms: boolean;
  note: string;
}
export default function ApplyDesigner() {
  const { user } = useAuth();

  // State for stepper
  const [activeStep, setActiveStep] = useState(0);
  //Make It jump to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submission tracking

  const [formData, setFormData] = useState<FormData>({
    // Step 1
    designerName: "",
    email: user?.email || "",
    phoneNumber: "",
    address: "",

    // Step 2
    specializationUrl: "",
    taxNumber: "",
    bio: "",
    experience: "",
    certificates: "",

    // Step 3
    portfolioUrl: "",
    bannerUrl: "",
    socialLinks: {
      instagram: "",
      behance: "",
      facebook: "",
      website: "",
    },
    avatarFile: [],
    bannerFile: [],
    portfolioFiles: [],

    // Step 4
    identificationType: "cccd",
    identificationNumber: "",
    fullName: user?.fullName || "",
    identificationPictureFile: [],
    identificationPictureOwner: "",

    // Step 5
    agreedToTerms: false,
    note: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // File size validation helper (5MB limit)
    const validateFileSize = (
      files: File[],
      fieldName: string,
      maxSizeMB = 5
    ) => {
      for (const file of files) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          newErrors[fieldName as keyof FormData] =
            `File ${file.name} quá lớn (tối đa ${maxSizeMB}MB)` as any;
          return false;
        }
      }
      return true;
    };

    switch (step) {
      case 0: // Basic Info
        if (!formData.designerName.trim())
          newErrors.designerName = "Tên nhà thiết kế là bắt buộc";
        if (!formData.email.trim()) newErrors.email = "Email là bắt buộc";
        if (!formData.phoneNumber.trim())
          newErrors.phoneNumber = "Số điện thoại là bắt buộc";
        if (!formData.address.trim()) newErrors.address = "Địa chỉ là bắt buộc";
        break;

      case 1: // Professional Info
        if (!formData.bio.trim())
          newErrors.bio = "Mô tả về bản thân là bắt buộc";
        // Certificates is optional, but you can require if needed:
        // if (!formData.certificates.trim()) newErrors.certificates = 'Chứng chỉ/Giải thưởng là bắt buộc';
        break;

      case 2: // Portfolio & Media
        if (formData.avatarFile.length === 0) {
          newErrors.avatarFile = "Vui lòng chọn ảnh đại diện" as any;
        } else {
          validateFileSize(formData.avatarFile, "avatarFile");
        }

        if (formData.bannerFile.length > 0) {
          validateFileSize(formData.bannerFile, "bannerFile");
        }

        if (formData.portfolioFiles.length > 0) {
          validateFileSize(formData.portfolioFiles, "portfolioFiles", 10); // 10MB for portfolio
        }
        break;

      case 3: // Identity Verification
        if (!formData.identificationNumber.trim())
          newErrors.identificationNumber = "Số CCCD/CMND là bắt buộc";
        if (!formData.fullName.trim())
          newErrors.fullName = "Họ và tên là bắt buộc";
        if (!formData.identificationPictureOwner.trim())
          newErrors.identificationPictureOwner =
            "Chủ sở hữu ảnh định danh là bắt buộc";
        if (formData.identificationPictureFile.length === 0) {
          newErrors.identificationPictureFile =
            "Vui lòng chọn ảnh CCCD/CMND" as any;
        } else {
          validateFileSize(
            formData.identificationPictureFile,
            "identificationPictureFile"
          );
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

      // DEBUG: Check token before making API call
      const token = localStorage.getItem("authToken");
      const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
      console.log("🔍 Debug Token Info:", {
        hasToken: !!token,
        token: token?.substring(0, 50) + "...",
        expiresAt: tokenExpiresAt,
        isExpired: tokenExpiresAt
          ? new Date() > new Date(tokenExpiresAt)
          : "No expiry date",
        user: user,
      });

      if (!token) {
        toast.error("Không tìm thấy token đăng nhập. Vui lòng đăng nhập lại.", {
          position: "top-center",
        });
        return;
      }

      if (tokenExpiresAt && new Date() > new Date(tokenExpiresAt)) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", {
          position: "top-center",
        });
        return;
      }

      // Show progress toast
      toast.info(
        "Đang upload files và xử lý đơn đăng ký... Vui lòng đợi trong giây lát.",
        {
          position: "top-center",
          autoClose: false,
        }
      );

      // Prepare social links JSON
      const socialLinksJson = JSON.stringify(formData.socialLinks);

      // Prepare request data
      const requestData: ApplyDesignerRequest = {
        avatarFile: formData.avatarFile[0],
        bannerFile: formData.bannerFile[0],
        portfolioUrl: formData.portfolioUrl || undefined,
        portfolioFiles: formData.portfolioFiles,
        bannerUrl: formData.bannerUrl || undefined,
        specializationUrl: formData.specializationUrl || undefined,
        socialLinks: socialLinksJson,
        identificationNumber: formData.identificationNumber,
        identificationPictureFile: formData.identificationPictureFile[0],
        note: formData.note || undefined,
      };

      console.log("🚀 Sending request data:", requestData);

      await applicationService.applyAsDesigner(requestData);

      // Dismiss progress toast and show success
      toast.dismiss();
      toast.success("Đơn đăng ký Designer đã được gửi thành công!", {
        position: "top-center",
      });

      navigate("/my-applications");
    } catch (error: any) {
      console.error("Error applying as designer:", error);

      // Dismiss progress toast
      toast.dismiss();

      // Show specific error message
      if (error.code === "ECONNABORTED") {
        toast.error(
          "Upload mất quá nhiều thời gian. Vui lòng thử lại với files nhỏ hơn.",
          {
            position: "bottom-center",
          }
        );
      } else {
        toast.error(error.message || "Có lỗi xảy ra khi gửi đơn đăng ký", {
          position: "bottom-center",
        });
      }
      setIsSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
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
          Bạn cần đăng nhập để đăng ký làm Designer.
        </Alert>
      </Container>
    );
  }

  // (Đoạn này là thừa, không cần thiết, đã có trong renderStepContent)

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Basic Info
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
              Thông tin cơ bản của bạn
            </Typography>

            <TextField
              fullWidth
              label="Tên Nhà Thiết Kế *"
              placeholder="Nhập tên nghệ danh hoặc tên thật của bạn"
              value={formData.designerName}
              onChange={(e) => updateFormData("designerName", e.target.value)}
              error={Boolean(errors.designerName)}
              helperText={
                errors.designerName ||
                `${formData.designerName.length}/50 ký tự`
              }
              inputProps={{ maxLength: 50 }}
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
              placeholder="Nhập số điện thoại của bạn"
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
              label="Địa chỉ *"
              placeholder="Nhập địa chỉ của bạn"
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
              label="Mô tả về bản thân *"
              placeholder="Hãy mô tả về bản thân, phong cách thiết kế, và điều khiến bạn đặc biệt..."
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
              label="Kinh nghiệm làm việc"
              placeholder="Mô tả về kinh nghiệm làm việc, các dự án đã thực hiện..."
              value={formData.experience}
              onChange={(e) => updateFormData("experience", e.target.value)}
              helperText={`${formData.experience.length}/300 ký tự`}
              inputProps={{ maxLength: 300 }}
            />

            <TextField
              fullWidth
              label="Chứng chỉ/Giải thưởng (Certificates)"
              placeholder="Nhập vào, cách nhau bởi dấu phẩy"
              value={formData.certificates}
              onChange={(e) => updateFormData("certificates", e.target.value)}
              helperText="Nhập các chứng chỉ hoặc giải thưởng, cách nhau bởi dấu phẩy"
              error={Boolean(errors.certificates)}
            />

            <TextField
              fullWidth
              label="URL chuyên môn"
              placeholder="https://your-specialization-site.com"
              value={formData.specializationUrl}
              onChange={(e) =>
                updateFormData("specializationUrl", e.target.value)
              }
              helperText="Link tới website hoặc trang web thể hiện chuyên môn của bạn"
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
              placeholder="Nhập mã số thuế cá nhân (nếu có)"
              value={formData.taxNumber}
              onChange={(e) => updateFormData("taxNumber", e.target.value)}
              helperText="Tùy chọn - Dành cho Designer có đăng ký kinh doanh"
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

            {/* Avatar Upload */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ảnh đại diện *
              </Typography>
              <FileUpload
                label="Chọn ảnh đại diện"
                files={formData.avatarFile}
                onFilesChange={(files) => updateFormData("avatarFile", files)}
                accept="image/*"
                maxSize={5}
                error={errors.avatarFile as string}
                helperText="Ảnh đại diện sẽ hiển thị trên profile của bạn (tối đa 5MB)"
              />
            </Paper>

            {/* Banner Upload */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Ảnh banner
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
                Portfolio (ảnh sản phẩm)
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
                helperText="Có thể chọn nhiều ảnh để showcase sản phẩm của bạn (mỗi ảnh tối đa 5MB)"
              />
            </Paper>

            <TextField
              fullWidth
              label="Portfolio URL"
              placeholder="https://your-portfolio.com"
              value={formData.portfolioUrl}
              onChange={(e) => updateFormData("portfolioUrl", e.target.value)}
              helperText="Link tới website portfolio của bạn"
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
                    label="Instagram"
                    placeholder="https://instagram.com/username"
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
                  <TextField
                    fullWidth
                    label="Behance"
                    placeholder="https://behance.net/username"
                    value={formData.socialLinks.behance}
                    onChange={(e) =>
                      updateSocialLinks("behance", e.target.value)
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
                    placeholder="https://facebook.com/page"
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
                    label="Website"
                    placeholder="https://your-website.com"
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
                </Box>
              </Box>
            </Paper>
          </Box>
        );

      case 3: // Identity Verification
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Alert severity="info">
              Vui lòng cung cấp Thông tin Định danh của Nhà Thiết Kế.
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
              label="Họ & Tên *"
              placeholder="Họ và tên theo CCCD/CMND"
              value={formData.fullName}
              onChange={(e) => updateFormData("fullName", e.target.value)}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
            />

            <TextField
              fullWidth
              label="Chủ sở hữu ảnh định danh"
              placeholder="Nhập tên chủ sở hữu ảnh"
              value={formData.identificationPictureOwner}
              onChange={(e) =>
                updateFormData("identificationPictureOwner", e.target.value)
              }
              error={Boolean(errors.identificationPictureOwner)}
              helperText={errors.identificationPictureOwner}
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
                helperText="Vui lòng chụp ảnh chụp cận CCCD/CMND. Các thông tin trong CCCD/CMND phải được hiển thị rõ ràng"
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
                      Tên Designer:
                    </Typography>
                    <Typography variant="body1">
                      {formData.designerName}
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
                      Số điện thoại:
                    </Typography>
                    <Typography variant="body1">
                      {formData.phoneNumber}
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Chứng chỉ/Giải thưởng:
                    </Typography>
                    <Typography variant="body1">
                      {formData.certificates}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Chủ sở hữu ảnh định danh:
                    </Typography>
                    <Typography variant="body1">
                      {formData.identificationPictureOwner}
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
            <PaletteIcon sx={{ fontSize: 48, color: "#4caf50", mb: 2 }} />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Đăng ký Nhà Thiết Kế
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Tham gia cộng đồng những nhà thiết kế thời trang bền vững
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
